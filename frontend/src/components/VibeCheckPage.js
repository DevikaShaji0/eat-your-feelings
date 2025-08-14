import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ArrowLeft, Send, Skull, Flame, Zap } from 'lucide-react';

const VibeCheckPage = ({ onBack, onNext, mood, setMood }) => {
  const handleSubmit = () => {
    if (mood.trim()) {
      onNext();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const genZMoods = [
    { text: 'sad', phrase: 'feeling sad fr 😭' },
    { text: 'stressed', phrase: 'stressed and tired of this life 💀' },
    { text: 'angry', phrase: 'angry at literally everything rn 🔥' },
    { text: 'anxious', phrase: 'anxious and overthinking EVERYTHING 🌪️' },
    { text: 'lonely', phrase: 'lonely and touch-starved bestie 💔' },
    { text: 'bored', phrase: 'bored out of my mind periodt ✋' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 bg-black/40 backdrop-blur-sm border-b border-pink-500/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/20 font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back (if you're scared 💀)
          </Button>
          <div className="flex items-center space-x-2">
            <Skull className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
              VIBE CHECK 📱✨
            </h1>
          </div>
          <div></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Main Question */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-6">
            What's your current vibe? 💭
          </h2>
          <p className="text-xl text-pink-300 mb-4 font-bold">
            Time to spill the tea bestie ☕
          </p>
          <p className="text-lg text-cyan-300">
            Tell us how you're feeling so we can make it 10x WORSE 💀✨
          </p>
        </div>
        
        {/* Input Section */}
        <div className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="e.g., I'm literally dying inside and everything is falling apart..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full text-lg py-6 px-6 bg-black/50 border-2 border-pink-500/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 text-white placeholder-pink-300/70 rounded-2xl backdrop-blur-sm font-medium"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-2xl pointer-events-none"></div>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!mood.trim()}
            className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-600 hover:via-pink-600 hover:to-purple-600 text-white font-black py-6 text-xl rounded-2xl shadow-xl border-2 border-pink-400/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
          >
            <Send className="mr-3 h-6 w-6" />
            Destroy Me Pls 💀
            <Fire className="ml-3 h-6 w-6" />
          </Button>
        </div>
        
        {/* Quick Mood Buttons */}
        <div className="mt-8">
          <p className="text-center text-purple-300 mb-4 font-semibold">
            Or choose your poison 🍷✨
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {genZMoods.map(({ text, phrase }) => (
              <Badge
                key={text}
                variant="outline"
                className="cursor-pointer py-3 px-4 bg-black/40 border-cyan-400/50 text-cyan-300 hover:bg-pink-500/20 hover:border-pink-400 hover:text-pink-300 transition-all duration-300 text-center justify-center font-bold backdrop-blur-sm"
                onClick={() => setMood(phrase)}
              >
                {phrase}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Fun warning */}
        <div className="mt-12 p-6 bg-gradient-to-r from-yellow-900/50 to-red-900/50 border border-yellow-500/50 rounded-2xl backdrop-blur-sm text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
            <span className="text-yellow-300 font-black text-lg">HEADS UP BESTIE</span>
            <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-yellow-200 font-semibold">
            Our AI is about to be absolutely UNHINGED fr fr 💀
          </p>
          <p className="text-yellow-300/80 text-sm mt-2">
            We're gonna serve you the most chaotic energy and make your day worse periodt ✨
          </p>
        </div>
      </main>
    </div>
  );
};

export default VibeCheckPage;