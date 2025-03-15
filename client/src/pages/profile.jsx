import { useAuth } from "../contexts/authContext";

const Profile = () => {

  const { user } = useAuth();
  if(!user) {
    return <div>Loading...</div>;
  }
  return(
    <div className="text-lg ">
      <div className="sm:w-100 border-2 border-primary/40 rounded-md p-5 m-6 bg-primary dark:bg-primary-d text-background ">
        <p className="font-bold mb-5 text-xl">User info</p>
        <p>Username:  {user.username}</p>
        <p>Name:  {user.name}</p>
      </div>
      <div className="sm:w-100 border-2 border-primary/40 rounded-md p-5 m-6 bg-primary dark:bg-primary-d text-background">
        <p className="font-bold mb-5 text-xl">Edit your info</p>
      </div>
      <div className="sm:w-100 border-2 border-primary/40 rounded-md p-5 m-6 bg-primary dark:bg-primary-d text-background">
        <p className="font-bold mb-5 text-xl">Account actions</p>
        <p className="text-rose-300">Reset Data</p>
        <p className="text-rose-300">Delete Account</p>
      </div>
    </div>
  );
}

export default Profile;