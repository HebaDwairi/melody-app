import melody from "../services/melody";
import noteDetection from '../services/noteDetection';
const Controls = ({onPlay, onGenerate}) => {
    return (
      <div className="bg-secondary dark:bg-secondary-d p-4 m-6 flex justify-center gap-4 rounded-lg font-bold">
        <button className="btn" onClick={onGenerate}>
          Generate
        </button>
        <button className="btn" onClick={onPlay}>
          Play
        </button>
        <button className="btn" onClick={() => noteDetection.start()}>
          Record
        </button>
      </div>
    );
  };
export default Controls;