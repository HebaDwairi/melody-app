import { useState } from "react";
import usersService from '../services/users';
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const [isLogin, setIslogin] = useState(true);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isLogin) {
      const credentials = {
        username: username.trim(),
        password: password.trim(),
      }

      const result = await login(credentials);

      if (result.success) {
        console.log('logged in as ' + result.data.name);
      }
      else {
        setErrorMessage(result.error);
      }
    }
    else {
      console.log('rehister')
      const userObj = {
        username: username.trim(),
        name: name.trim(),
        password: password.trim()
      }

      usersService
        .create(userObj)
        .then(res => {
          console.log(res);
          setUsername('');
          setName('');
          setPassword('');
          setErrorMessage('');
          setIslogin(true);
        })
        .catch(error => {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
        });
    }
  }
  return(
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-7 border-2 border-primary/40 rounded-md p-5">
        <p className="text-xl font-bold">
          {isLogin ? 'Log in' : 'Register'}
        </p>
        <span className="text-rose-400">{errorMessage}</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input 
            type="text"
            placeholder="Username" 
            className="inp" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
          {!isLogin && 
            <input 
              type="text" 
              placeholder="Name" 
              className="inp" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          }
          <input 
              type="password" 
              placeholder="Password" 
              className="inp" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" type="submit">
            {isLogin ? 'Log in' : 'Register'}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span className="text-primary hover:underline cursor-pointer hover:text-accent"
          onClick={() => {setIslogin(!isLogin)}}>
            {isLogin ? 'Register' : 'Log in'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;