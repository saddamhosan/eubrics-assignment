import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../Firebase.init";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="flex justify-between items-center h-[60px] px-10 bg-blue-500 text-white">
      <h1 className="text-2xl font-bold font-serif hover:text-gray-400">
        <Link to="/">Eubrics</Link>
      </h1>
      <div className="flex space-x-4 font-bold items-center">
        {user?.uid ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => signOut(auth)}
              className="btn btn-sm  text-white btn-outline"
            >
              Log Out
            </button>
            <p className="font-bold text-white">{user.displayName}</p>
          </div>
        ) : (
          <Link to="/login" className="btn btn-outline">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
