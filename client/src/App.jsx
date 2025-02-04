import { useEffect, useState } from 'react';
import Header from './components/Header';
import Settings from './components/Settings';
import NotesView from './components/NotesView';
import Controls from './components/Controls';
import melody from './services/melody';

const App = () => {
  const [curMelody, setCurMelody] = useState([]);
  const [options, setOptions] = useState({
    scale: 'all',
    length: 4,
    bpm: 120
  });

  const handleGenerateMelody = () => {
    const newMelody = melody.generate(options);
    setCurMelody(newMelody);
  }

  const handlePlayMelody = () => {
    melody.play(curMelody);
  }

  return (
    <div className="bg-background dark:bg-background-d min-h-screen flex flex-col text-text dark:text-text-d">
      <Header />
      <div className="flex flex-1 px-14">
        <Settings />
        <div className="flex flex-col flex-1 overflow-hidden gap-0">
          <NotesView />
          <Controls onGenerate={handleGenerateMelody} onPlay={handlePlayMelody}/>
        </div>
      </div>
    </div>
  );
};

export default App;