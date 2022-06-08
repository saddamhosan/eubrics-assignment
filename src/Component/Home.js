import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate=useNavigate()
    const [collections,setCollections]=useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/collection")
          .then((res) => res.json())
          .then((data) => setCollections(data));
    },[])
    return (
      <div>
        {collections.map((collection) => (
          <p
            onClick={() => navigate(`/notes/${collection._id}`)}
            key={collection._id}
          >
            {collection.name}
          </p>
        ))}
      </div>
    );
};

export default Home;