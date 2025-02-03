const Controls = () => {
    return (
      <div className="bg-secondary dark:bg-secondary-d p-4 m-6 flex justify-center gap-4 rounded-lg shadow-lg font-bold">
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