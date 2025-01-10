import { useEffect, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import PostCard from "./PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { post_id } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllPosts();
  }, []);
  async function fetchAllPosts() {
    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/api/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  if (loading) return <div className="loading">Loading...</div>;
  return (
    <div className="AllPosts">
      {post_id !== "" && typeof post_id !== "undefined" ? (
        <Outlet />
      ) : (
        <div className="posts-div">
          {posts &&
            posts.length > 0 &&
            posts.map((post, i) => <PostCard key={i} post={post} />)}
        </div>
      )}
    </div>
  );
}

export default AllPosts;
