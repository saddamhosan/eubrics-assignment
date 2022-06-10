import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    fetch("https://safe-basin-76577.herokuapp.com/collection", {
      method: "get",
      headers: {
        authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);
  return (
    <div className="grid md:grid-cols-3 gap-6 mx-10  mt-10 cursor-pointer ">
      {collections.map((collection) => (
        <div
          onClick={() => navigate(`/notes/${collection._id}`)}
          key={collection._id}
          className="card  bg-base-100 shadow-xl hover:text-blue-900 text-blue-500"
        >
          <div className="card-body">
            <p className="text-2xl font-bold text-center font-serif ">
              {collection.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
