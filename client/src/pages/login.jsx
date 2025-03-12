const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  }
  return(
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-10 border-2 border-primary/40 rounded-md p-5">
        <p className="text-xl font-bold">Log in</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input type="text" placeholder="Username" className="inp"/>
          <input type="password" placeholder="Password" className="inp"/>
          <button className="btn" type="submit">login</button>
        </form>
        <p>Don&apos;t have an account? <span className="text-primary hover:underline cursor-pointer hover:text-accent">Register</span></p>
      </div>
    </div>
  );
}

export default Login;