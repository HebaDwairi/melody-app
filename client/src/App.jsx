import { useEffect, useState } from 'react';
import Header from './components/Header';
import Settings from './components/Settings';
import NotesView from './components/NotesView';
import Controls from './components/Controls';

const App = () => {
  return (
    <div className="bg-teal-600/40 dark:bg-teal-950 min-h-screen flex flex-col text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Settings />
        <NotesView />
      </div>
      <Controls />
    </div>
  );
};

export default App;