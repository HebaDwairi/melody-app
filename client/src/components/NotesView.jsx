import { useState,useEffect } from "react";
import { Note } from "tonal";
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';


const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload,type} = props;

  if(!cx || !cy) return null;

  const dot = {
    r: payload.correct ? 20 : 15,
    fill: payload.correct ? '#7d936c' : type? '#a14b4b' : '#7d936c',
    content: type ? payload.userNote : payload.originalNote,
  } 

  return (
    <g>
      <circle cx={cx} cy={cy} 
        r={dot.r} stroke={stroke} 
        strokeWidth={2} fill={dot.fill} />

      <text x={cx} y={cy} dy={5} fontSize={12} textAnchor="middle" fill="#FFF">
        {dot.content}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-accent text-white p-2 rounded-md shadow-md text-[1rem]">
        <p>Original: {payload[0].payload.originalNote}</p>
        <p>Played: {payload[0].payload.userNote}</p>
      </div>
    );
  }
  return null;
};

const NotesView = ({melody, detectedNote, data, setData}) => {
  const [res, setRes] = useState({correct: 0, distances: 0});
  const [final, setFinal] = useState('');

  useEffect(() => {
      if(detectedNote.note !== null){
          console.log(detectedNote, melody[detectedNote.count]);
          setFinal('');
          const originalNote = melody[detectedNote.count].note;
          const userNote = detectedNote.note;
          const midi1 = Note.midi(originalNote) % 12;
          const midi2 = Note.midi(userNote) % 12;

          
          const dataPoint = {
            originalNote: originalNote,
            userNote: userNote,
            A: Note.freq(originalNote) * Note.freq(originalNote),
            B: Note.freq(userNote) * Note.freq(userNote),
            correct: midi1 === midi2,
          }

          setData(data.concat(dataPoint));
  
          setRes((prevRes) => {
            const newCorrect = midi1 === midi2 ? prevRes.correct + 1 : prevRes.correct;
            const newDistances = midi1 !== midi2 ? prevRes.distances + Math.abs(midi1 - midi2) : prevRes.distances;
            return { correct: newCorrect, distances: newDistances };
          });


          if(detectedNote.count === melody.length - 1){
            const errorRate = (res.distances + Math.abs(midi1 - midi2)) / (11 * melody.length);

            setFinal(`${res.correct + (midi1 === midi2 ? 1 : 0)} / ${melody.length}
               |   Accuracy: ${(100 * (1 - errorRate)).toFixed(1)}   %`);
            setRes({correct: 0, distances: 0});
            
          }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detectedNote]);

   useEffect(() => {
      setData([]);
      setFinal('');
    }, [melody, setData])

  return (
    <div className="bg-secondary dark:bg-secondary-d p-6 m-6 rounded-md mb-0 justify-center flex-col flex border-2 border-primary/40">
      <div className=" rounded-md h-full p-4 flex items-center text-2xl" style={{height:'50vh'}}>
      <ResponsiveContainer width="100%" height="100%" >
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 5,
          }}
          padding={{
            top: 15,
            bottom:15,
          }}
        >
          
          <Tooltip content={<CustomTooltip />}/>

          <Line 
            type="monotone" 
            dataKey="A" 
            stroke="#7d936c" 
            isAnimationActive={false} 
            dot={<CustomizedDot type={0}/>}/>

          <Line 
            type="monotone" 
            dataKey="B" 
            stroke="#7d936c" 
            isAnimationActive={false} 
            dot={<CustomizedDot type={1}/>} />

        </LineChart>
      </ResponsiveContainer>
      </div>
      <div className="h-8 p-1 text-2xl text-primary-d m-auto">
        {final ? `Result : ${final}` : null}
      </div>
    </div>
  );
};

export default NotesView;