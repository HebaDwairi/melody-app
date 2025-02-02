const Controls = () => {
    return (
      <div className="bg-white/10 dark:bg-teal-900/20 p-4 m-6 flex justify-center gap-4 rounded-lg shadow-lg">
        <button className="btn">
          Generate
        </button>
        <button className="btn">
          Play
        </button>
        <button className="btn">
          Record
        </button>
      </div>
    );
  };
export default Controls;