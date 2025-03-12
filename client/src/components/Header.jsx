import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    }, []);
  
    const toggleTheme = () => {
      if (isDarkMode) {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      } else {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      }
      setIsDarkMode(!isDarkMode);
    };
  
    return (
      <div className=" p-3 flex text-xl font-bold justify-between px-12 items-center border-primary/40 border-b-2">
        <div>Melody App</div>
        <div className="flex gap-6">
          <button onClick={toggleTheme} className="btn">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="btn" onClick={() => navigate('login')}>
            Login
          </button>
        </div>
      </div>
    );
  };

  export default Header;