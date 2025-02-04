const Settings = () => {
    return (
      <div className="bg-secondary dark:bg-secondary-d  p-6 m-6 rounded-md flex flex-col gap-2 w-55 mr-0 font-bold">
        <div className="space-y-2">
          <label className="block">Scale</label>
          <select className="inp">
            <option>C Major</option>
            <option>Minor</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block">BPM</label>
          <input className="inp" type="number" />
        </div>
        <div className="space-y-2">
          <label className="block">Length</label>
          <input className="inp" />
        </div>
        <div className="space-y-2">
          <label className="block">BPM</label>
          <input className="inp" type="number" />
        </div>
        <div className="space-y-2">
          <label className="block">Length</label>
          <input className="inp" type="number" />
        </div>
      </div>
    );
  };

  export default Settings;