import { Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Notes from "./Component/Notes";
import Register from "./Component/Register";


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/notes/:id" element={<Notes/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
