from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import google.generativeai as genai

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Configure Gemini AI
gemini_api_key = os.environ.get('GEMINI_API_KEY')
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable is required")

genai.configure(api_key=gemini_api_key)
model = genai.GenerativeModel('gemini-2.5-flash')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class MoodRequest(BaseModel):
    mood: str

class MoodSuggestionResponse(BaseModel):
    food: str
    recipe: str
    roast: str
    mood: str

class MoodSuggestion(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    mood: str
    food: str
    recipe: str
    roast: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_ip: str = ""

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/mood-suggestion", response_model=MoodSuggestionResponse)
async def get_mood_suggestion(request: MoodRequest):
    try:
        # Create a prompt that ensures opposite mood logic and structured output
        prompt = f"""
        User's current mood: "{request.mood}"
        
        Please provide a food suggestion that is the OPPOSITE of their current mood to help balance their emotions. For example:
        - If they're sad → suggest happy/energetic food
        - If they're angry → suggest calming/soothing food  
        - If they're stressed → suggest comfort food
        - If they're bored → suggest exciting/adventurous food
        - If they're tired → suggest energizing food
        
        Please respond in this exact format:
        FOOD: [Name of the opposite mood food]
        RECIPE: [Short, easy recipe in 1-2 sentences]
        ROAST: [Witty, humorous life advice about their mood - be sarcastic but not mean]
        
        Keep the recipe practical and the roast funny but supportive.
        """
        
        # Generate response using Gemini
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Parse the structured response
        lines = response_text.split('\n')
        food = ""
        recipe = ""
        roast = ""
        
        for line in lines:
            line = line.strip()
            if line.startswith('FOOD:'):
                food = line.replace('FOOD:', '').strip()
            elif line.startswith('RECIPE:'):
                recipe = line.replace('RECIPE:', '').strip()
            elif line.startswith('ROAST:'):
                roast = line.replace('ROAST:', '').strip()
        
        # Fallback if parsing fails
        if not food or not recipe or not roast:
            # Try alternative parsing
            if 'FOOD:' in response_text:
                parts = response_text.split('FOOD:')[1].split('RECIPE:')
                food = parts[0].strip()
                if len(parts) > 1:
                    recipe_roast = parts[1].split('ROAST:')
                    recipe = recipe_roast[0].strip()
                    if len(recipe_roast) > 1:
                        roast = recipe_roast[1].strip()
        
        # Final fallback with default responses
        if not food:
            food = "Chocolate Chip Cookies"
        if not recipe:
            recipe = "Mix flour, butter, sugar, and chocolate chips. Bake at 350°F for 12 minutes until golden."
        if not roast:
            roast = "Life's too short to not eat cookies. At least they won't judge your life choices."
        
        # Create response object
        suggestion = MoodSuggestionResponse(
            food=food,
            recipe=recipe,
            roast=roast,
            mood=request.mood
        )
        
        # Save to database for analytics (optional)
        try:
            mood_entry = MoodSuggestion(
                mood=request.mood,
                food=food,
                recipe=recipe,
                roast=roast,
                user_ip=""  # Could add request IP for analytics
            )
            await db.mood_suggestions.insert_one(mood_entry.dict())
        except Exception as db_error:
            # Log but don't fail the request if DB save fails
            logger.warning(f"Failed to save mood suggestion to DB: {db_error}")
        
        return suggestion
        
    except Exception as e:
        logger.error(f"Error generating mood suggestion: {str(e)}")
        
        # Provide a fallback response if AI fails
        fallback_suggestions = [
            {
                "food": "Warm Chocolate Chip Cookies",
                "recipe": "Mix flour, butter, brown sugar, and chocolate chips. Bake at 350°F for 12 minutes.",
                "roast": "Sometimes life gives you lemons, but today it's giving you cookies. Much better deal."
            },
            {
                "food": "Spicy Ramen Bowl", 
                "recipe": "Boil ramen noodles, add spicy broth, top with egg and vegetables. Slurp loudly for best results.",
                "roast": "Your problems are temporary, but this ramen is about to be gone in 5 minutes. Priorities."
            },
            {
                "food": "Fresh Fruit Smoothie",
                "recipe": "Blend banana, berries, yogurt, and honey. Add ice for extra chill vibes.",
                "roast": "Being healthy is boring, but at least this tastes like a milkshake in disguise."
            }
        ]
        
        import random
        fallback = random.choice(fallback_suggestions)
        
        return MoodSuggestionResponse(
            food=fallback["food"],
            recipe=fallback["recipe"], 
            roast=fallback["roast"],
            mood=request.mood
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()