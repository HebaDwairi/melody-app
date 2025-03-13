import { ScaleType } from "tonal";
const Settings = ({options, setOptions}) => {
    const all = ScaleType.names();
    all.unshift('All scales')

    return (
      <div className=" sm:block bg-secondary dark:bg-secondary-d p-6 m-6 rounded-md flex flex-col gap-2 sm:w-55 sm:mr-0 font-bold border-2 border-primary/40">
        <h3 className="border-b-2 border-primary/40 pb-2">Options</h3>
        <div className="space-y-1">
          <label className="block">Scale</label>
          <select className="inp" 
            value={options.scale} 
            onChange={(e) => setOptions({...options, scale: e.target.value})}>
            {all.map(scale => (<option key={scale}>{scale}</option>))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block">BPM</label>
          <input className="inp" type="number" 
          value={options.bpm}
          onChange={(e) => setOptions({...options, bpm: e.target.value})}/>
        </div>

        <div className="space-y-1">
          <label className="block">Length</label>
          <input className="inp" type="number"
          value={options.length}
          onChange={(e) => setOptions({...options, length: e.target.value})}/>
        </div>
        <div className="space-y-1">
          <label className="block">Tuning</label>
          <input className="inp" 
          value={options.tuning}
          onChange={(e) => setOptions({...options, tuning: e.target.value})}/>
        </div>
        <div className="space-y-1">
          <label className="block">Synth</label>
          <input className="inp"
          value={options.synth}
          onChange={(e) => setOptions({...options, synth: e.target.value})}/>
        </div>
      </div>
    );
  };

  export default Settings;