import { useState, useEffect } from "react";
function Stats() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchAllPosts();
  }, []);
  async function fetchAllPosts() {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/posts", {
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
    <div className="Stats">
      <div className="totalPosts stat">
        <div>Total Posts</div>
        <div>{posts && posts.length}</div>
      </div>
      <div className="pubPosts stat">
        <div>Published Posts</div>

        <div>{posts.filter((post) => post.published === true).length}</div>
      </div>
      <div className="unpubPosts stat">
        <div>Unpublished Posts</div>

        <div>{posts.filter((post) => post.published === false).length}</div>
      </div>
    </div>
  );
}

export default Stats;
