# Eat Your Feelings - API Contracts & Integration Plan

## API Endpoints Required

### 1. POST /api/mood-suggestion
**Purpose**: Get AI-powered food suggestion based on user's mood
**Request Body**:
```json
{
  "mood": "string" // User's mood description (e.g., "I'm feeling sad and overwhelmed")
}
```

**Response**:
```json
{
  "food": "string",        // Suggested food name
  "recipe": "string",      // Quick recipe instructions
  "roast": "string",       // Witty life advice/roast
  "mood": "string"         // Original mood for reference
}
```

## Frontend Mock Data Replacement

### Current Mock Implementation (`/app/frontend/src/utils/mock.js`)
- Contains 6 predefined mood responses (sad, angry, stressed, bored, anxious, tired)
- `mockAIResponse()` function simulates AI responses with 2-second delay
- Used in `AppPage.js` component's `handleGetSuggestion()` function

### Integration Changes Required
1. **Replace mock function** in `AppPage.js`:
   - Remove mock import and usage
   - Implement actual API call to `/api/mood-suggestion`
   - Keep loading states and error handling

2. **API Call Implementation**:
   ```javascript
   const response = await axios.post(`${BACKEND_URL}/api/mood-suggestion`, {
     mood: userMoodInput
   });
   ```

## Backend Implementation Plan

### 1. Gemini AI Integration
- Install Google Generative AI SDK
- Configure Gemini API with provided key: `AIzaSyB6ZB7Q_GlxBQQs00Do4W5KuYYP2IWsRZM`
- Create prompt that ensures:
  - Food suggestion is opposite of mood (happy food for sad mood, calm food for angry mood)
  - Recipe is short and practical
  - Life roast is witty but not offensive

### 2. Database Schema (Optional - for future features)
```python
class MoodSuggestion(BaseModel):
    id: str
    mood: str
    food: str
    recipe: str
    roast: str
    timestamp: datetime
    user_ip: str  # For basic analytics
```

### 3. Environment Variables
- Add `GEMINI_API_KEY` to backend `.env` file
- Ensure proper error handling for API failures

### 4. API Response Format
The Gemini API should return structured data matching the frontend expectations.

## Error Handling
- Network failures: Show user-friendly error message
- API rate limits: Implement retry logic or fallback responses
- Invalid responses: Provide default witty response

## Testing Checklist
- [ ] Gemini API integration works with provided key
- [ ] Frontend successfully calls backend API
- [ ] Error handling for various mood inputs
- [ ] Response format matches frontend expectations
- [ ] Loading states work correctly