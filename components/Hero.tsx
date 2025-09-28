"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#0c0414] text-white flex flex-col relative overflow-x-hidden">
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-40rem] right-[-30rem] z-[0] blur-[4rem] skew-[-40deg] opacity-50">
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300"></div>
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-50rem] right-[-50rem] z-[0] blur-[4rem] skew-[-40deg] opacity-50">
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem] bg-gradient-to-b from-white to-blue-300"></div>
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-60rem] right-[-60rem] z-[0] blur-[4rem] skew-[-40deg] opacity-50">
        <div className="w-[10rem] h-[30rem] bg-gradient-to-b from-white to-blue-300"></div>
        <div className="w-[10rem] h-[30rem] bg-gradient-to-b from-white to-blue-300"></div>
        <div className="w-[10rem] h-[30rem] bg-gradient-to-b from-white to-blue-300"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex-1 flex justify-center">
            <div className="bg-[#1c1528] border border-purple-400/20 rounded-full px-6 py-3 flex items-center gap-3 w-fit mx-auto backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                Cards as Unique as You
              </span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Pixiefie
          </h1>
          
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Pixiefie transforms your social media handles into stunning gradient cards effortlessly
          </p>
          
          <div className="flex justify-center mt-8">
            <Link href="/generate">
              <Button
                variant="outline"
                className="rounded-full px-10 py-4 text-lg font-semibold border-2 border-purple-400/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm hover:from-purple-800/30 hover:to-blue-800/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Hero };