import "./App.css";
import AllPosts from "./pages/AllPosts";
import Post from "./pages/Post";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import ProtectedAuth from "./components/ProtectedAuth";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<ProtectedAuth />}>
            <Route index element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route exact path="/home" element={<Home />}>
              <Route exact index element={<Stats />} />

              <Route path="posts" element={<AllPosts />}>
                <Route path=":post_id" element={<Post />} />
              </Route>
              <Route path="create" element={<CreatePost />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
