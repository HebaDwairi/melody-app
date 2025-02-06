import { Note } from "tonal";
import NoteDetector from "../services/NoteDetector";
import { useEffect, useState } from "react";

const Controls = ({onPlay, onGenerate, melody}) => {
  const [detectedNote, setDetectedNote] = useState(null);
  const [noteNum, setNoteNum] = useState(0);
  const [res, setRes] = useState('');

  const handleRecording = () => {
    const detector = new NoteDetector(setDetectedNote);
    detector.start();
  }

  useEffect(() => {
    if(detectedNote !== null){
      if(noteNum === melody.length){
        //stop recording, i need make a function for that
      }
      else{
        console.log(detectedNote, melody[noteNum]);
        const frq1 = Note.freq(melody[noteNum].note);
        const frq2 = Note.freq(detectedNote);

        //temporary way to display result
        if(frq1 === frq2){
          setRes(res.concat(' correct'));
        }
        else{
          setRes(res.concat(' wrong'));
        }
        setNoteNum(noteNum + 1);
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
        Record
      </button>
      <p>{res}</p>
    </div>
  );
};
export default Controls;