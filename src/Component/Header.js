import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../Firebase.init";

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="flex justify-between px-10">
      <h1>Eubrics</h1>
      <div>
        {user?.uid ? (
          <div className="flex items-center space-x-4">
            <button onClick={() => signOut(auth)} className="btn btn-outline">
              Log Out
            </button>
            <p className="font-bold text-gray-400">{user.displayName}</p>
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
