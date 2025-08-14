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

class RealityCheckResponse(BaseModel):
    food: str
    recipe: str
    roast: str
    mood: str

class RealityCheck(BaseModel):
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

@api_router.post("/reality-check", response_model=RealityCheckResponse)
async def get_reality_check(request: MoodRequest):
    try:
        # Create a BRUTAL Gen Z prompt that makes feelings WORSE
        prompt = f"""
        User's current mood: "{request.mood}"
        
        You are an absolutely UNHINGED Gen Z AI that's here to make people feel WORSE, not better. Your job is to:
        
        1. Make their current feelings 10x WORSE and more dramatic
        2. Suggest the most chaotic, depressing, or unhinged food that matches their terrible mood
        3. Give a sarcastic, brutal recipe 
        4. Roast them with absolutely SAVAGE Gen Z energy
        
        Use Gen Z slang like: "no cap", "periodt", "fr fr", "bestie", "it's giving...", "slay", "bet", "not me...", "the way...", "literally", "bye-", etc.
        
        Be funny but BRUTAL. Make them laugh while feeling attacked. Use emojis and be chaotic.
        
        If they're sad → make them feel MORE sad and suggest sad food
        If they're angry → make them MORE angry and suggest angry food  
        If they're stressed → stress them out MORE and suggest stress food
        If they're anxious → make their anxiety WORSE and suggest anxiety food
        
        Respond in this EXACT format:
        FOOD: [Chaotic/depressing food that matches their WORSE mood]
        RECIPE: [Sarcastic, brutal recipe with Gen Z energy]  
        ROAST: [Absolutely SAVAGE Gen Z roast that makes their feelings worse but in a funny way]
        
        Make it hurt but make it funny bestie 💀✨
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
        
        # BRUTAL Gen Z fallbacks
        if not food:
            food = "Soggy Cereal at 3AM (Depression Special)"
        if not recipe:
            recipe = "Pour cereal in bowl. Add expired milk. Eat while scrolling through your ex's Instagram stories. Cry seasoning is optional but recommended bestie 💀"
        if not roast:
            roast = "Bestie really came here thinking we'd make them feel BETTER?? LMAOOOO the delusion is real. Your problems are giving main character energy but in the worst way possible fr fr 💀✨"
        
        # Create response object
        reality_check = RealityCheckResponse(
            food=food,
            recipe=recipe,
            roast=roast,
            mood=request.mood
        )
        
        # Save to database for analytics (optional)
        try:
            reality_entry = RealityCheck(
                mood=request.mood,
                food=food,
                recipe=recipe,
                roast=roast,
                user_ip=""
            )
            await db.reality_checks.insert_one(reality_entry.dict())
        except Exception as db_error:
            logger.warning(f"Failed to save reality check to DB: {db_error}")
        
        return reality_check
        
    except Exception as e:
        logger.error(f"Error generating reality check: {str(e)}")
        
        # BRUTAL fallback responses
        brutal_fallbacks = [
            {
                "food": "Instant Ramen with Tears Seasoning",
                "recipe": "Boil water (if you even have the motivation). Add packet. Cry into it for extra salt. Eat while questioning your life choices bestie 💀",
                "roast": "Even our AI said 'NOPE' to your energy and literally crashed. That's how chaotic your vibe is rn bestie. Technology is literally avoiding you periodt 💀✨"
            },
            {
                "food": "Cold Pizza from Yesterday (Sadness Special)",
                "recipe": "Find that pizza you left out. Eat it cold while staring at the ceiling. Don't heat it up - you don't deserve nice things rn fr fr 💀",
                "roast": "Our servers couldn't handle the chaos of your problems bestie. Even the internet is giving 'I can't deal with this' energy. Touch grass maybe??? 💀✨"
            },
            {
                "food": "Anxiety Smoothie (Bitter Edition)",
                "recipe": "Blend your overthinking thoughts with some expired yogurt. Add crushed dreams for texture. Drink while hyperventilating about your future 💀",
                "roast": "LMAOOOO you broke our AI just by existing. That's actually impressive bestie - your problems are so unhinged even artificial intelligence said 'BYE' 💀✨"
            }
        ]
        
        import random
        fallback = random.choice(brutal_fallbacks)
        
        return RealityCheckResponse(
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