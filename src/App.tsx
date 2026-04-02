/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CloudRain, 
  Wind, 
  Sun, 
  Cloud, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  Trophy, 
  ChevronRight,
  Home as HomeIcon,
  Info
} from 'lucide-react';
import { MONSOON_QUESTIONS, FUN_FACTS } from './constants';
import { AppState } from './types';

export default function App() {
  const [state, setState] = useState<AppState>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleStartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setState('quiz');
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === MONSOON_QUESTIONS[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < MONSOON_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setState('results');
    }
  };

  const getResultMessage = () => {
    if (score === 5) return { text: "Excellent 🌟", color: "text-yellow-500" };
    if (score >= 3) return { text: "Good 👍", color: "text-green-500" };
    return { text: "Try Again 💡", color: "text-blue-500" };
  };

  return (
    <div className="min-h-screen bg-sky-50 font-sans text-slate-800 overflow-x-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-10 left-10 text-sky-200 opacity-50"
        >
          <Cloud size={120} />
        </motion.div>
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-40 right-20 text-sky-200 opacity-50"
        >
          <CloudRain size={100} />
        </motion.div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 text-yellow-200 opacity-30"
        >
          <Sun size={150} />
        </motion.div>
        <motion.div 
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-40 right-10 text-sky-200 opacity-40"
        >
          <Wind size={80} />
        </motion.div>
      </div>

      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-sky-100 px-6 py-4 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-2 font-bold text-xl text-sky-600 cursor-pointer" onClick={() => setState('home')}>
          <CloudRain className="animate-bounce" />
          <span>Monsoon Quiz</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setState('home')}
            className={`p-2 rounded-full transition-colors ${state === 'home' ? 'bg-sky-100 text-sky-600' : 'hover:bg-sky-50 text-slate-500'}`}
          >
            <HomeIcon size={20} />
          </button>
          <button 
            onClick={() => setState('learn')}
            className={`p-2 rounded-full transition-colors ${state === 'learn' ? 'bg-sky-100 text-sky-600' : 'hover:bg-sky-50 text-slate-500'}`}
          >
            <BookOpen size={20} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {state === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-black text-sky-900 tracking-tight">
                  Monsoon in India Quiz
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  The Indian monsoon is one of the most spectacular weather phenomena in the world. 
                  Test your knowledge about the winds that bring life to India's fields!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button 
                  onClick={handleStartQuiz}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-lg shadow-sky-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Start Quiz <ChevronRight size={24} />
                </button>
                <button 
                  onClick={() => setState('learn')}
                  className="bg-white hover:bg-sky-50 text-sky-600 border-2 border-sky-600 px-8 py-4 rounded-2xl font-bold text-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Learn More <BookOpen size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                {FUN_FACTS.map((fact, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-sky-100 text-left hover:shadow-md transition-shadow"
                  >
                    <div className="bg-sky-100 w-10 h-10 rounded-full flex items-center justify-center text-sky-600 mb-4">
                      <Info size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-sky-900 mb-2">{fact.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{fact.fact}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {state === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-sky-100 border border-sky-50"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-sky-600 font-bold bg-sky-50 px-4 py-1 rounded-full text-sm">
                  Question {currentQuestionIndex + 1} of {MONSOON_QUESTIONS.length}
                </span>
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-sky-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / MONSOON_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
                {MONSOON_QUESTIONS[currentQuestionIndex].question}
              </h2>

              <div className="space-y-4">
                {MONSOON_QUESTIONS[currentQuestionIndex].options.map((option, index) => {
                  const isCorrect = index === MONSOON_QUESTIONS[currentQuestionIndex].correctAnswer;
                  const isSelected = selectedOption === index;
                  
                  let buttonClass = "w-full p-5 rounded-2xl text-left font-medium transition-all border-2 flex justify-between items-center ";
                  
                  if (!isAnswered) {
                    buttonClass += "border-slate-100 hover:border-sky-300 hover:bg-sky-50 text-slate-700";
                  } else {
                    if (isCorrect) {
                      buttonClass += "border-green-500 bg-green-50 text-green-700";
                    } else if (isSelected) {
                      buttonClass += "border-red-500 bg-red-50 text-red-700";
                    } else {
                      buttonClass += "border-slate-50 bg-slate-50 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button 
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={buttonClass}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="text-green-500" size={24} />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" size={24} />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-sky-50 rounded-2xl border border-sky-100"
                  >
                    <p className="text-sky-800 text-sm leading-relaxed">
                      <span className="font-bold block mb-1">Did you know?</span>
                      {MONSOON_QUESTIONS[currentQuestionIndex].explanation}
                    </p>
                    <button 
                      onClick={handleNextQuestion}
                      className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-xl font-bold transition-all shadow-md shadow-sky-200"
                    >
                      {currentQuestionIndex === MONSOON_QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {state === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 bg-white p-12 rounded-[2.5rem] shadow-xl shadow-sky-100 border border-sky-50"
            >
              <div className="flex justify-center">
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="bg-sky-100 p-8 rounded-full"
                  >
                    <Trophy size={80} className="text-sky-600" />
                  </motion.div>
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-yellow-400 text-white p-3 rounded-full shadow-lg"
                  >
                    <Sun size={24} />
                  </motion.div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-900">Quiz Completed!</h2>
                <p className="text-slate-500 text-lg">You scored</p>
                <div className="text-7xl font-black text-sky-600">
                  {score} <span className="text-3xl text-slate-300">/ 5</span>
                </div>
                <p className={`text-2xl font-bold ${getResultMessage().color}`}>
                  {getResultMessage().text}
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button 
                  onClick={handleStartQuiz}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-lg shadow-sky-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} /> Restart Quiz
                </button>
                <button 
                  onClick={() => setState('home')}
                  className="text-slate-500 hover:text-sky-600 font-bold transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          )}

          {state === 'learn' && (
            <motion.div 
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-sky-100 border border-sky-50 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="bg-sky-100 p-4 rounded-2xl text-sky-600">
                    <BookOpen size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Learn About Monsoon</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-sky-700 flex items-center gap-2">
                      <Wind size={20} /> What is a Monsoon?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      A monsoon is not just a rainstorm; it's a seasonal change in the direction of the prevailing winds of a region. In India, these winds blow from the sea to the land in summer, bringing moisture and rain.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-sky-700 flex items-center gap-2">
                      <CloudRain size={20} /> Why does it rain?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      During summer, the land gets very hot. This hot air rises, and cool, moist air from the Indian Ocean rushes in to take its place. As this moist air hits the mountains (like the Himalayas), it rises and cools down, turning into rain clouds!
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-sky-700 flex items-center gap-2">
                      <Sun size={20} /> The Two Types
                    </h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li><span className="font-bold">Southwest Monsoon:</span> June to September. Brings rain to most of India.</li>
                      <li><span className="font-bold">Northeast Monsoon:</span> October to December. Brings rain mainly to Tamil Nadu and Andhra Pradesh.</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-sky-700 flex items-center gap-2">
                      <Info size={20} /> Importance
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      India's economy and food depend on the monsoon. It fills our rivers, provides water for crops like rice, and keeps the environment green and healthy.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={handleStartQuiz}
                    className="bg-sky-600 hover:bg-sky-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-sky-200 transition-all hover:scale-105 active:scale-95"
                  >
                    Ready for the Quiz?
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 py-12 text-center text-slate-400 text-sm">
        <p>© 2026 Monsoon in India Educational Quiz</p>
        <p className="mt-2 font-medium">Designed by Sowjith Anumola</p>
      </footer>
    </div>
  );
}
