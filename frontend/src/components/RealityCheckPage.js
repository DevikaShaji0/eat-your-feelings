import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Skull, Flame, Zap, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RealityCheckPage = ({ onBack, onReset, mood }) => {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mood) {
      getRealityCheck();
    }
  }, [mood]);

  const getRealityCheck = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API}/reality-check`, {
        mood: mood.trim()
      });
      
      setSuggestion(response.data);
    } catch (err) {
      console.error('Error getting reality check:', err);
      setError('Even our AI is having a breakdown rn bestie 💀');
      
      // Fallback brutal response
      setSuggestion({
        food: 'Instant Ramen at 3AM',
        recipe: 'Boil water (if you even have the energy), dump packet, cry into it for seasoning.',
        roast: 'Lmaooo our AI said "nah bestie, you\'re beyond help" and literally crashed. Even technology is avoiding your energy rn 💀✨',
        mood: mood
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-black relative overflow-hidden">
      {/* Chaotic background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-500/20 rounded-full blur-lg animate-bounce delay-2000"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 bg-black/60 backdrop-blur-sm border-b border-red-500/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/20 font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Escape (coward) 💀
          </Button>
          <div className="flex items-center space-x-2">
            <Flame className="h-6 w-6 text-red-400 animate-pulse" />
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
              REALITY CHECK 📱💀
            </h1>
          </div>
          <div></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-16">
            <div className="mb-6">
              <Skull className="h-16 w-16 mx-auto text-pink-400 animate-spin" />
            </div>
            <h2 className="text-3xl font-black text-pink-400 mb-4">
              Preparing to DESTROY you... 💀✨
            </h2>
            <p className="text-lg text-purple-300 animate-pulse">
              Our AI is cooking up the most UNHINGED roast fr fr...
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-6 bg-red-900/50 border-2 border-red-500/50 rounded-2xl flex items-center text-red-300 backdrop-blur-sm">
            <AlertTriangle className="h-6 w-6 mr-3 flex-shrink-0 animate-pulse" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {suggestion && !loading && (
          <div className="space-y-6">
            {/* Brutal intro */}
            <Card className="bg-gradient-to-r from-red-900/80 to-pink-900/80 border-2 border-red-500/50 shadow-2xl backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Fire className="h-8 w-8 text-red-400" />
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                    REALITY CHECK SERVED 💀
                  </h2>
                  <Fire className="h-8 w-8 text-red-400" />
                </div>
                <p className="text-xl text-pink-300 font-bold">
                  Bestie... this is about to HIT DIFFERENT 📱💀
                </p>
              </CardContent>
            </Card>

            {/* Food suggestion (chaos edition) */}
            <Card className="bg-black/60 border-2 border-purple-500/50 shadow-xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-yellow-400 mr-2 animate-pulse" />
                    <span className="text-purple-400 font-black text-lg">YOUR CHAOTIC MEAL BESTIE</span>
                    <Zap className="h-6 w-6 text-yellow-400 ml-2 animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {suggestion.food} ✨
                  </h3>
                </div>

                {/* Sarcastic Recipe */}
                <div className="mb-6 p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/30">
                  <h4 className="font-black text-purple-300 mb-3 text-lg flex items-center">
                    <Fire className="h-5 w-5 mr-2" />
                    Recipe (if you can even handle it) 💀
                  </h4>
                  <p className="text-purple-200 leading-relaxed font-medium">
                    {suggestion.recipe}
                  </p>
                </div>

                {/* Brutal Reality Check */}
                <div className="p-6 bg-gradient-to-r from-red-900/50 to-yellow-900/50 rounded-2xl border-2 border-red-500/30">
                  <h4 className="font-black text-red-300 mb-3 text-lg flex items-center">
                    <Skull className="h-5 w-5 mr-2 animate-pulse" />
                    UNHINGED REALITY CHECK ✨💀
                  </h4>
                  <blockquote className="text-red-200 leading-relaxed font-bold text-lg italic border-l-4 border-red-400 pl-4">
                    "{suggestion.roast}"
                  </blockquote>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onReset}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black px-8 py-4 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Roasted Again 💀✨
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 font-bold px-8 py-4 text-lg rounded-2xl backdrop-blur-sm"
              >
                Start Over (weakling) 🔄
              </Button>
            </div>

            {/* Final brutal message */}
            <div className="text-center mt-8 p-6 bg-black/50 rounded-2xl border border-pink-500/30 backdrop-blur-sm">
              <p className="text-pink-300 font-bold text-lg mb-2">
                Hope this made your day WORSE bestie 💀✨
              </p>
              <p className="text-purple-300 text-sm">
                Share your trauma with friends periodt 📱💅
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RealityCheckPage;