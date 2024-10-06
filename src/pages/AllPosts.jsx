import { useEffect, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import PostCard from "./PostCard";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const { post_id } = useParams();

    useEffect(()=>{
      fetchAllPosts();
    }, [])
    async function fetchAllPosts(){
      const response = await fetch("http://localhost:3000/api/posts",{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        }
      });
      const data = await response.json();
      setPosts(data.posts);
    }


    return (
      <div className='AllPosts'>
         {post_id !== "" && typeof post_id !== "undefined" ? (
            <Outlet />
          ) : (
            <div className="posts-div">
               {
                    posts.length>0 && posts.map((post, i)=>(
                     <PostCard key={i} post={post}/>
                    ))
                }
            </div>
          )}
   
      </div>
    )
  }
  
  export default AllPosts;
  