const Settings = () => {
    return (
      <div className="bg-white/10 dark:bg-teal-900/20 p-6 m-6 rounded-md flex flex-col gap-6 w-64 shadow-lg">
        <div className="space-y-2">
          <label className="block text-teal-100 dark:text-teal-300">Scale</label>
          <select className="w-full p-2 rounded bg-white/20 dark:bg-teal-900/30 text-teal-100 dark:text-teal-300">
            <option>C Major</option>
            <option>Minor</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-teal-100 dark:text-teal-300">BPM</label>
          <input className="w-full p-2 rounded bg-white/20 dark:bg-teal-900/30 text-teal-100 dark:text-teal-300" type="number" />
        </div>
        <div className="space-y-2">
          <label className="block text-teal-100 dark:text-teal-300">Length</label>
          <input className="w-full p-2 rounded bg-white/20 dark:bg-teal-900/30 text-teal-100 dark:text-teal-300" type="number" />
        </div>
      </div>
    );
  };

  export default Settings;