import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ChefHat, Heart, Sparkles, ArrowLeft, Send } from 'lucide-react';
import { mockAIResponse } from '../utils/mock';

const AppPage = ({ onBack }) => {
  const [mood, setMood] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetSuggestion = async () => {
    if (!mood.trim()) return;
    
    setLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const mockResponse = mockAIResponse(mood);
      setSuggestion(mockResponse);
      setLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGetSuggestion();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-orange-600" />
            <h1 className="text-xl font-bold text-orange-800">Eat Your Feelings</h1>
          </div>
          <div></div> {/* Spacer for center alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-orange-800 mb-4">
            How are you feeling today?
          </h2>
          <p className="text-orange-600 mb-6">
            Tell me about your current mood, and I'll suggest the perfect food to balance it out!
          </p>
          
          <div className="flex gap-3 mb-4">
            <Input
              type="text"
              placeholder="e.g., I'm feeling stressed and overwhelmed..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-lg py-3 px-4 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
            />
            <Button
              onClick={handleGetSuggestion}
              disabled={!mood.trim() || loading}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3"
            >
              {loading ? (
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Cooking...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="h-4 w-4 mr-2" />
                  Get Suggestion
                </div>
              )}
            </Button>
          </div>
          
          {/* Quick Mood Examples */}
          <div className="flex flex-wrap justify-center gap-2">
            {['sad', 'stressed', 'angry', 'bored', 'anxious', 'tired'].map((exampleMood) => (
              <Badge
                key={exampleMood}
                variant="outline"
                className="cursor-pointer hover:bg-orange-100 border-orange-200 text-orange-700"
                onClick={() => setMood(`I'm feeling ${exampleMood}`)}
              >
                {exampleMood}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {suggestion && (
          <Card className="shadow-lg border-orange-200 animate-in slide-in-from-bottom-4 duration-500">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm text-orange-600 font-medium">Perfect Match Found!</span>
                </div>
                <h3 className="text-2xl font-bold text-orange-800">
                  {suggestion.food}
                </h3>
              </div>

              {/* Recipe Section */}
              <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                  <ChefHat className="h-4 w-4 mr-2" />
                  Quick Recipe
                </h4>
                <p className="text-orange-700 leading-relaxed">
                  {suggestion.recipe}
                </p>
              </div>

              {/* Life Roast Section */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Life Roast
                </h4>
                <p className="text-amber-700 leading-relaxed italic">
                  "{suggestion.roast}"
                </p>
              </div>

              {/* Try Again Button */}
              <div className="text-center mt-6">
                <Button
                  onClick={() => {
                    setMood('');
                    setSuggestion(null);
                  }}
                  variant="outline"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  Try Another Mood
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AppPage;