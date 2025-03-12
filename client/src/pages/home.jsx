import { useState } from 'react';
import Settings from '../components/Settings';
import NotesView from '../components/NotesView';
import Controls from '../components/Controls';
import melody from '../services/melody';

const Home = () => {
  const [curMelody, setCurMelody] = useState([]);
  const [detectedNote, setDetectedNote] = useState({note: null, count: 0});
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({
    scale: 'All scales',
    length: 4,
    bpm: 120,
    tuning: 'D standard',
    synth: 'Default'
  });

  const handleGenerateMelody = () => {
    const newMelody = melody.generate(options);
    setCurMelody(newMelody);
    melody.play(newMelody);
  }

  const handlePlayMelody = () => {
    melody.play(curMelody);
  }

  return (
    <div className="bg-background dark:bg-background-d flex flex-col text-text dark:text-text-d ">
      <div className="flex px-14">
        <Settings 
          setOptions={setOptions} 
          options={options}/>
        <div className="flex flex-col flex-1 overflow-hidden gap-0">
          <NotesView 
            melody={curMelody} 
            detectedNote={detectedNote} 
            data={data} 
            setData={setData}/>
          <Controls 
            onGenerate={handleGenerateMelody} 
            onPlay={handlePlayMelody} 
            melody={curMelody} 
            setDetectedNote={setDetectedNote} 
            detectedNote={detectedNote} 
            setData={setData}/>
        </div>
      </div>
    </div>
  );
};

export default Home;