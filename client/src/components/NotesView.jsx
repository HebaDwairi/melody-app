import { useState,useEffect } from "react";
import { Note } from "tonal";

const NotesView = ({melody, detectedNote}) => {
  const [res, setRes] = useState('');
  const [final, setFinal] = useState('');

  useEffect(() => {
      if(detectedNote.note !== null){
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

          if(detectedNote.count === melody.length - 1){
            setFinal(res.concat( midi1 === midi2 ? ' correct' : ' wrong'));
            setRes("");
          }
      }
    }, [detectedNote]);

  return (
    <div className="bg-secondary dark:bg-secondary-d  p-6 m-6 flex-1 rounded-md mb-0">
      <div className=" rounded-md h-full p-4 flex items-center justify-center text-2xl">
          {res}
      </div>
      <div>
        {final}
      </div>
    </div>
  );
};

export default NotesView;