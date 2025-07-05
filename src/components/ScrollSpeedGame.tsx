
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Trophy, Clock, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ScrollSpeedGameProps {
  onClose: () => void;
}

interface Obstacle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'wall' | 'spike' | 'moving';
  direction?: number;
}

interface PowerUp {
  id: string;
  x: number;
  y: number;
  type: 'speed' | 'shield' | 'points';
  collected: boolean;
}

const ScrollSpeedGame: React.FC<ScrollSpeedGameProps> = ({ onClose }) => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [playerY, setPlayerY] = useState(250);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [hasShield, setHasShield] = useState(false);
  const [speedBoost, setSpeedBoost] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(2);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const generateObstacle = useCallback((x: number): Obstacle => {
    const types: Obstacle['type'][] = ['wall', 'spike', 'moving'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y: Math.random() * 400 + 50,
      width: type === 'spike' ? 30 : 60,
      height: type === 'spike' ? 30 : 60,
      type,
      direction: type === 'moving' ? (Math.random() > 0.5 ? 1 : -1) : undefined
    };
  }, []);

  const generatePowerUp = useCallback((x: number): PowerUp => {
    const types: PowerUp['type'][] = ['speed', 'shield', 'points'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y: Math.random() * 400 + 50,
      type,
      collected: false
    };
  }, []);

  const checkCollision = useCallback((playerX: number, playerY: number, obj: { x: number; y: number; width: number; height: number }) => {
    return (
      playerX < obj.x + obj.width &&
      playerX + 40 > obj.x &&
      playerY < obj.y + obj.height &&
      playerY + 40 > obj.y
    );
  }, []);

  const gameLoop = useCallback(() => {
    if (!gameStarted || gameOver) return;

    setScrollPosition(prev => prev + gameSpeed);
    setScore(prev => prev + Math.floor(gameSpeed));

    // Move obstacles
    setObstacles(prev => prev.map(obstacle => {
      if (obstacle.type === 'moving' && obstacle.direction) {
        const newY = obstacle.y + obstacle.direction * 2;
        if (newY <= 0 || newY >= 460) {
          obstacle.direction *= -1;
        }
        return { ...obstacle, y: Math.max(0, Math.min(460, newY)) };
      }
      return obstacle;
    }).filter(obstacle => obstacle.x > scrollPosition - 100));

    // Generate new obstacles
    if (Math.random() < 0.02) {
      setObstacles(prev => [...prev, generateObstacle(scrollPosition + 800)]);
    }

    // Generate new power-ups
    if (Math.random() < 0.01) {
      setPowerUps(prev => [...prev, generatePowerUp(scrollPosition + 800)]);
    }

    // Filter old power-ups
    setPowerUps(prev => prev.filter(powerUp => powerUp.x > scrollPosition - 100));

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameStarted, gameOver, gameSpeed, scrollPosition, generateObstacle, generatePowerUp]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameStarted || gameOver) return;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        setPlayerY(prev => Math.max(0, prev - 20));
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        setPlayerY(prev => Math.min(460, prev + 20));
        break;
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop, gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Collision detection
  useEffect(() => {
    if (!gameStarted || gameOver || hasShield) return;

    const playerX = 100;
    const collision = obstacles.some(obstacle => 
      checkCollision(playerX, playerY, obstacle)
    );

    if (collision) {
      setGameOver(true);
    }
  }, [obstacles, playerY, gameStarted, gameOver, hasShield, checkCollision]);

  // Power-up collection
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const playerX = 100;
    powerUps.forEach(powerUp => {
      if (!powerUp.collected && checkCollision(playerX, playerY, { x: powerUp.x - scrollPosition, y: powerUp.y, width: 30, height: 30 })) {
        powerUp.collected = true;
        
        switch (powerUp.type) {
          case 'speed':
            setSpeedBoost(true);
            setGameSpeed(prev => prev * 1.5);
            setTimeout(() => {
              setSpeedBoost(false);
              setGameSpeed(prev => prev / 1.5);
            }, 3000);
            break;
          case 'shield':
            setHasShield(true);
            setTimeout(() => setHasShield(false), 5000);
            break;
          case 'points':
            setScore(prev => prev + 100);
            break;
        }
        
        toast({
          title: `💫 Power-up collected!`,
          description: `${powerUp.type.charAt(0).toUpperCase() + powerUp.type.slice(1)} boost activated!`,
        });
      }
    });
  }, [powerUps, playerY, scrollPosition, gameStarted, gameOver, checkCollision, toast]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setScrollPosition(0);
    setPlayerY(250);
    setObstacles([]);
    setPowerUps([]);
    setHasShield(false);
    setSpeedBoost(false);
    setGameSpeed(2);
  };

  const endGame = async () => {
    if (!user || !profile) return;

    try {
      const pointsEarned = Math.floor(score / 10);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          points: (profile.points || 0) + pointsEarned,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      
      toast({
        title: `🏁 Game of Scroll Complete!`,
        description: `Distance: ${Math.floor(scrollPosition)}m | Earned: ${pointsEarned} points`,
      });
      
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (gameOver && score > 0) {
      endGame();
    }
  }, [gameOver]);

  if (!user) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-4xl w-full h-[600px] relative border border-orange-500/30 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mb-2">
              🏃‍♂️ Game of Scroll
            </h2>
            {!gameStarted ? (
              <div className="space-y-4">
                <p className="text-gray-400">
                  Navigate through obstacles as fast as possible! Use arrow keys or WASD to move up and down.
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm max-w-md mx-auto">
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Speed Boost</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full" />
                    <span className="text-gray-300">Shield</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Bonus Points</span>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-8 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
                >
                  🚀 Start Scrolling
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center text-lg">
                <div className="flex space-x-6">
                  <span className="text-orange-400">Distance: {Math.floor(scrollPosition)}m</span>
                  <span className="text-yellow-400">Score: {score}</span>
                  {hasShield && <span className="text-green-400">🛡️ SHIELD</span>}
                  {speedBoost && <span className="text-blue-400">⚡ SPEED</span>}
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-bold">{timeLeft}s</span>
                </div>
              </div>
            )}
          </div>

          {/* Game Area */}
          {gameStarted && !gameOver && (
            <div 
              ref={gameRef}
              className="relative bg-gradient-to-r from-orange-900/20 to-yellow-900/20 rounded-xl h-96 overflow-hidden border-2 border-orange-500/30"
            >
              {/* Player */}
              <div
                className={`absolute w-10 h-10 rounded-full transition-all duration-100 ${
                  hasShield ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-orange-500'
                }`}
                style={{
                  left: '100px',
                  top: `${playerY}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  🏃‍♂️
                </div>
              </div>

              {/* Obstacles */}
              {obstacles.map((obstacle) => (
                <div
                  key={obstacle.id}
                  className={`absolute ${
                    obstacle.type === 'spike' ? 'bg-red-500' : 
                    obstacle.type === 'moving' ? 'bg-purple-500' : 'bg-gray-600'
                  } rounded`}
                  style={{
                    left: `${obstacle.x - scrollPosition}px`,
                    top: `${obstacle.y}px`,
                    width: `${obstacle.width}px`,
                    height: `${obstacle.height}px`
                  }}
                >
                  {obstacle.type === 'spike' && <span className="text-white text-xs">⚠️</span>}
                  {obstacle.type === 'moving' && <span className="text-white text-xs">↕️</span>}
                </div>
              ))}

              {/* Power-ups */}
              {powerUps.filter(p => !p.collected).map((powerUp) => (
                <div
                  key={powerUp.id}
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center ${
                    powerUp.type === 'speed' ? 'bg-blue-500' :
                    powerUp.type === 'shield' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{
                    left: `${powerUp.x - scrollPosition}px`,
                    top: `${powerUp.y}px`
                  }}
                >
                  {powerUp.type === 'speed' && <Zap className="w-4 h-4 text-white" />}
                  {powerUp.type === 'shield' && <span className="text-white text-xs">🛡️</span>}
                  {powerUp.type === 'points' && <Star className="w-4 h-4 text-white" />}
                </div>
              ))}

              {/* Speed lines for effect */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-0.5 bg-orange-400"
                    style={{
                      left: `${(scrollPosition * -0.5 + i * 100) % 800}px`,
                      top: `${50 + i * 35}px`,
                      width: '50px'
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {gameOver && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center space-y-4"
            >
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto" />
              <h3 className="text-2xl font-bold text-white">🏁 Scroll Complete!</h3>
              <div className="space-y-2">
                <p className="text-orange-400 text-xl">Distance: {Math.floor(scrollPosition)}m</p>
                <p className="text-yellow-400">Final Score: {score}</p>
                <p className="text-green-400">Points Earned: {Math.floor(score / 10)}</p>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  🔄 Play Again
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}

          {gameStarted && !gameOver && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-400">
              Use ↑↓ Arrow Keys or W/S to move
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ScrollSpeedGame;
