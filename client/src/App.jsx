import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Stats from './pages/stats';
import Profile from './pages/profile';
import Login from './pages/login';

const App = () => {
  
  return (
    <div className="bg-background dark:bg-background-d min-h-screen flex flex-col text-text dark:text-text-d ">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/stats' element={<Stats />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </div>
  );
};

export default App;