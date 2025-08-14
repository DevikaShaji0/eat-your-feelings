import React from 'react';
import { Button } from './ui/button';
import { Sparkles, Zap, Flame } from 'lucide-react';

const HomePage = ({ onNext }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-cyan-900">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse"></div>
      
      {/* Floating neon elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/30 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-500/30 rounded-full blur-lg animate-bounce delay-1000"></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-yellow-400/30 rounded-full blur-lg animate-bounce delay-2000"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title with neon effect */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-4 tracking-tight animate-pulse">
              Eat Your 
            </h1>
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 tracking-tight">
              Feelings 💀
            </h1>
          </div>
          
          {/* Gen Z Tagline */}
          <div className="mb-8 space-y-2">
            <p className="text-2xl md:text-3xl text-pink-300 font-bold">
              Because therapy is giving expensive energy 💸
            </p>
            <p className="text-lg md:text-xl text-cyan-300 font-medium">
              and we're here to make it WORSE periodt ✨
            </p>
          </div>
          
          {/* Description */}
          <div className="mb-10 space-y-2">
            <p className="text-lg text-purple-200 max-w-2xl mx-auto leading-relaxed">
              Ready to get absolutely DESTROYED by our AI? 🔥
            </p>
            <p className="text-base text-pink-200 max-w-xl mx-auto">
              We'll roast your feelings and serve you the most chaotic recipes fr fr
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={onNext}
              size="lg"
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold px-12 py-6 text-xl rounded-full shadow-2xl border-2 border-pink-400/50 transform hover:scale-105 transition-all duration-300 hover:shadow-pink-500/50 animate-pulse"
            >
              <Flame className="mr-3 h-6 w-6" />
              Let's Get Toxic ✨
              <Sparkles className="ml-3 h-6 w-6" />
            </Button>
            <p className="text-sm text-cyan-300 animate-bounce">
              (no cap, this is gonna hurt bestie) 💀
            </p>
          </div>
          
          {/* Warning banner */}
          <div className="mt-12 p-4 bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-500/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-red-300 font-semibold">Warning: This app is NOT here to help you feel better</span>
              <Zap className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-red-200 text-sm mt-2">
              We're about to make your day 10x worse and serve you chaos on a plate 🍽️💀
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom neon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/60 via-pink-500/20 to-transparent"></div>
    </div>
  );
};

export default HomePage;