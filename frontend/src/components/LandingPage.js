import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Food Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1605926637412-b0cd5a3e3543?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxjb21mb3J0JTIwZm9vZHxlbnwwfHx8fDE3NTUxOTM5MzF8MA&ixlib=rb-4.1.0&q=85')`
        }}
      />
      
      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-orange-800/60 to-red-900/70"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Eat Your <span className="text-amber-300">Feelings</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-amber-100 mb-8 font-medium max-w-2xl mx-auto leading-relaxed">
            Because therapy is expensive and biryani is not.
          </p>
          
          {/* Description */}
          <p className="text-lg text-amber-50/90 mb-10 max-w-xl mx-auto leading-relaxed">
            Get AI-powered food suggestions that match the opposite of your mood, 
            complete with recipes and a dose of witty life advice.
          </p>
          
          {/* CTA Button */}
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-amber-500/25"
          >
            Let's Start Cooking
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 opacity-20 animate-bounce delay-1000">
            <div className="w-16 h-16 bg-amber-400 rounded-full blur-sm"></div>
          </div>
          <div className="absolute bottom-32 right-16 opacity-20 animate-bounce delay-2000">
            <div className="w-12 h-12 bg-orange-400 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-900/40 to-transparent"></div>
    </div>
  );
};

export default LandingPage;