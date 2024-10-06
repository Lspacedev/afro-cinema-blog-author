import Nav from "../components/Nav";
import AllPosts from "./AllPosts";
import CreatePost from "./CreatePost";
import { useSearchParams, useParams, Outlet, Link } from "react-router-dom";

function Home() {
  const { post_id } = useParams();

    return (
      <div className='Home'>
        <Nav/>
        <CreatePost/>
        {/* <AllPosts/> */}
        {/* {post_id !== "" && typeof post_id !== "undefined" ? (
        <Outlet />
      ) : (
        // <AllPosts/> 
        <div>dd</div>
      )} */}
      </div>
    )
  }
  
  export default Home;
  