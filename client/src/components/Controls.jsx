import { Note } from "tonal";
import NoteDetector from "../services/NoteDetector";
import { useEffect, useRef, useState } from "react";

const Controls = ({onPlay, onGenerate, melody}) => {
  const [detectedNote, setDetectedNote] = useState({note: null, count: 0});
  const [res, setRes] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const detectorRef = useRef(null);


  const handleRecording = () => {
    if(!detectorRef.current){
      detectorRef.current = new NoteDetector(setDetectedNote);
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
    if(detectedNote.note !== null){
      if(detectedNote.count === melody.length){
        stopRecording();
        setRes("");
      }
      else{
        console.log(detectedNote, melody[detectedNote.count]);
        const midi1 = Note.midi(melody[detectedNote.count].note) % 12;
        const midi2 = Note.midi(detectedNote.note) % 12;

        //temporary way to display result
        if(midi1 === midi2){
          setRes(res.concat(' correct'));
        }
        else{
          setRes(res.concat(' wrong'));
        }
      }
    }
  }, [detectedNote]);

  return (
    <div className="bg-secondary dark:bg-secondary-d p-4 m-6 flex justify-center gap-4 rounded-lg font-bold">
      <button className="btn" onClick={onGenerate}>
        Generate
      </button>
      <button className="btn" onClick={onPlay}>
        Play
      </button>
      <button className="btn" onClick={handleRecording}>
       {isRecording ? "stop" : "record"}
      </button>
      <p>{res}</p>
    </div>
  );
};
export default Controls;