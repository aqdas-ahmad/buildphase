import React from 'react';
import { Play, Square, Timer, Pause } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const TimerWidget = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-[#A81932] border-none shadow-none relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      <CardContent className="p-8 relative z-10 flex flex-col items-center text-center">
        <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-300">
          <Timer size={24} />
        </div>
        
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#F9E6EA] mb-2">Zeiterfassung Aktiv</p>
        <h3 className="text-4xl font-mono font-bold text-white mb-8 tracking-tighter tabular-nums">
          {formatTime(seconds)}
        </h3>

        <div className="flex gap-3 w-full">
          {!isRunning ? (
            <Button 
              className="flex-1 bg-white text-[#A81932] hover:bg-[#F9E6EA] h-11 font-bold text-[11px] uppercase tracking-wider rounded-sm"
              onClick={() => setIsRunning(true)}
            >
              <Play size={16} className="mr-2 fill-current" />
              Starten
            </Button>
          ) : (
            <Button 
              className="flex-1 bg-[#3D2E00] text-[#FACC15] hover:bg-[#4D3A00] h-11 font-bold text-[11px] uppercase tracking-wider rounded-sm"
              onClick={() => setIsRunning(false)}
            >
              <Pause size={16} className="mr-2 fill-current" />
              Pause
            </Button>
          )}
          <Button 
            variant="ghost" 
            className="flex-1 h-11 border border-white/20 text-white hover:bg-white/10 font-bold text-[11px] uppercase tracking-wider rounded-sm"
            onClick={() => { setIsRunning(false); setSeconds(0); }}
          >
            <Square size={14} className="mr-2" />
            Abschließen
          </Button>
        </div>

        <div className="mt-6 flex items-center gap-2 text-[9px] text-[#F9E6EA] font-medium opacity-80">
          <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse" />
          System bereit: Sitzung für DLC Bau GmbH
        </div>
      </CardContent>
    </Card>
  );
};

export { TimerWidget };
