import { useEffect, useRef, useState } from 'react';
import { useTuner } from './hooks/useTuner';
import { useAudioPipeline } from './hooks/useAudioPipeline';
import { useReferenceTone } from './hooks/useReferenceTone';
import { useAutoPowerOff } from './hooks/useAutoPowerOff';
import { Device } from './components/Device';
import './App.css';

function App() {
  const { state, dispatch } = useTuner();
  const containerRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Audio pipeline
  useAudioPipeline(state.power, state.calibration, dispatch);

  // Reference tone
  useReferenceTone(state.power, state.soundEnabled, state.soundNoteIndex, state.calibration);

  // Auto power off
  useAutoPowerOff(state.power, state.tuningStatus, dispatch);

  // Responsive scaling: fit device to viewport while maintaining proportions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Device is 680x340, add padding
        const scaleX = (width - 32) / 700;
        const scaleY = (height - 32) / 380;
        setScale(Math.min(scaleX, scaleY, 1.4)); // cap at 1.4x
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="tuner-viewport" ref={containerRef}>
      <div
        className="device-wrapper"
        ref={deviceRef}
        style={{ transform: `scale(${scale})` }}
      >
        <Device state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
