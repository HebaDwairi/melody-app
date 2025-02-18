import { useState,useEffect } from "react";
import { Note } from "tonal";
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


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

const NotesView = ({melody, detectedNote}) => {
  const [res, setRes] = useState('');
  const [final, setFinal] = useState('');
  const[data, setData] = useState([]);

  useEffect(() => {
      if(detectedNote.note !== null){
          console.log(detectedNote, melody[detectedNote.count]);
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

   useEffect(() => {
      setData([]);
    }, [melody])

  return (
    <div className="bg-secondary dark:bg-secondary-d  p-6 m-6 flex-1 rounded-md mb-0">
      <div className=" rounded-md h-full p-4 flex items-center text-2xl">
      <ResponsiveContainer width="100%" aspect={2.9}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          padding={{
            top: 10,
            bottom:10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          <Line 
            type="monotone" 
            dataKey="A" 
            stroke="#7d936c" 
            isAnimationActive={true} 
            dot={<CustomizedDot type={0}/>}/>

          <Line 
            type="monotone" 
            dataKey="B" 
            stroke="#7d936c" 
            isAnimationActive={true} 
            dot={<CustomizedDot type={1}/>} />

        </LineChart>
      </ResponsiveContainer>
      </div>
      <div>{final}</div>
    </div>
  );
};

export default NotesView;