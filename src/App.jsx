/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-zinc-950" />
              </div>
              <h1 className="text-xl font-bold tracking-tight hidden sm:block">
                Unblocked<span className="text-emerald-500">Games</span>
              </h1>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-zinc-400">
              <span className="hidden md:block">v1.0.0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Play Anywhere, <span className="text-emerald-500 italic">Unblocked.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            A curated collection of the best web games, ready to play in your browser. No downloads, no blocks, just fun.
          </p>
        </motion.div>
      </header>

      {/* Games Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-500/50 transition-all cursor-pointer shadow-lg"
              onClick={() => setSelectedGame(game)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-100">{game.title}</h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Web Game</p>
                </div>
                <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                  <Gamepad2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No games found matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col transition-all duration-300 ${
                isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl aspect-video'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-zinc-700">
                <div className="flex items-center gap-3">
                  <Gamepad2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-zinc-100">{selectedGame.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-zinc-700 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100"
                    title="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Maximize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGame(null);
                      setIsFullscreen(false);
                    }}
                    className="p-2 hover:bg-zinc-700 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-emerald-500" />
            <span className="font-bold">Unblocked Games Hub</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2026 Unblocked Games Hub. All games are property of their respective owners.
          </p>
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
