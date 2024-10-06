import './App.css';
import AllPosts from './pages/AllPosts';
import Post from './pages/Post';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/log-in" element={<Login/>} />
          <Route path="posts" element={<AllPosts />}>
            <Route path=":post_id" element={<Post />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
