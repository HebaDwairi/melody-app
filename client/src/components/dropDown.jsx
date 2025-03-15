import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const DropDown = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="absolute top-15 right-6 bg-primary text-base rounded-lg text-white p-1" ref={ref}>
      <ul>
        <li 
          className="btn m-1" 
          onClick={() => {navigate('profile')}}
        >
          Profile
        </li>
        <li 
          className="btn m-1" 
          onClick={() => {navigate('stats')}}
        >
          Stats
        </li>
        <hr className="h-1 bg-accent border-none"/>
        <li 
          className="btn m-1" 
          onClick={() => {logout()}}
        >
          Logout
        </li>
      </ul>
    </div>
  );
});

DropDown.displayName = "DropDown";

export default DropDown;