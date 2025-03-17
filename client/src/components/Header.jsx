import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { CircleUserRound, Moon, Sun } from 'lucide-react';
import { useAuth } from "../contexts/authContext";
import DropDown from "./DropDown";

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const {user} = useAuth();

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

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setMenuVisible(false);
        }
      };
  
      if (menuVisible) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [menuVisible]);
  
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
        <div onClick={() => {navigate('/')}} className="hover:cursor-default">Melody App</div>
        <div className="flex gap-6">
          <button onClick={toggleTheme} className="btn">
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
          {!user ? 
            <button className="btn" onClick={() => navigate('login')}>
              Login
            </button>:
            <button onClick={() => {setMenuVisible(!menuVisible)}}  className="btn">
              <CircleUserRound />
            </button>  
          }
          {menuVisible && <DropDown ref={dropdownRef}/>}
        </div>
      </div>
    );
  };

  export default Header;