import { Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Notes from "./Component/Notes";
import Register from "./Component/Register";
import RequireAuth from "./Component/RequireAuth";
import Update from "./Component/Update";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <RequireAuth>
              <Notes />
            </RequireAuth>
          }
        />
        <Route
          path="/update/:id"
          element={
            <RequireAuth>
              <Update />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
