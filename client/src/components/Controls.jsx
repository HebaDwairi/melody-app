import NoteDetector from "../services/NoteDetector";
import { useEffect, useRef, useState } from "react";
import { Repeat, Play, Disc, Pause } from 'lucide-react';

const Controls = ({onPlay, onGenerate, melody, setDetectedNote, detectedNote, setData}) => {
  const [isRecording, setIsRecording] = useState(false);
  const detectorRef = useRef(null);

  const handleRecording = () => {
    setData([]);
    if(!detectorRef.current){
      detectorRef.current = new NoteDetector();
      detectorRef.current.start();
    }
    else{
      stopRecording();
    }
    setIsRecording(!isRecording);
  }

  const stopRecording = () => {
    if(detectorRef.current){
      detectorRef.current.stop();
      detectorRef.current = null;
      setIsRecording(!isRecording);
    }
  }

  useEffect(() => {
    if (detectorRef.current) {
      detectorRef.current.onNoteDetected((note, count) => {
        setDetectedNote({ note, count });
      });
      
    }
  }, [isRecording, setDetectedNote]); 
  

  useEffect(() => {
    if(detectedNote.note !== null){
      if(detectedNote.count === melody.length - 1){
        stopRecording();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectedNote]);

  return (
    <div className="bg-secondary dark:bg-secondary-d p-4 m-6 flex justify-center gap-4 rounded-lg font-bold border-2 border-primary/40 mb-12 sm:mb-6">
      <button className="btn" onClick={onGenerate}>
        <Repeat />
      </button>
      <button className="btn" onClick={onPlay}>
        <Play />
      </button>
      <button className="btn" onClick={handleRecording}>
       {isRecording ? <Pause /> : <Disc />}
      </button>
    </div>
  );
};
export default Controls;