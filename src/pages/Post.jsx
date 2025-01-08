import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { IoCloseOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

function Post() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const [errors, setErrors] = useState();

  const [edit, setEdit] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const { post_id } = useParams();

  useEffect(() => {
    fetchPost();
  }, []);
  async function fetchPost() {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:3000/api/posts/${post_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTitle(data.title);
        setText(data.text);
        setPost(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  async function updatePost() {
    try {
      setLoading(true);

      const formData = new FormData();
      if (title !== "") {
        formData.append("title", title);
      }

      if (text !== "") {
        formData.append("text", text);
      }

      if (typeof image !== "undefined") {
        formData.append("image", image);
      }

      const res = await fetch(`http://localhost:3000/api/posts/${post_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigation(0);
      } else {
        setErrors(data.errors);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function publishPost() {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/posts/${post_id}/publish`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ publish: true }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigation(0);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function unpublishPost() {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/posts/${post_id}/unpublish`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ publish: false }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigation(0);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function deletePost() {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:3000/api/posts/${post_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigation("/home/posts");
        navigation(0);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function deleteComment(id) {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/posts/${post_id}/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        navigation(0);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Loading...</div>;
  return (
    <div className="Post">
      {edit === true ? (
        <div className="post-form">
          <div className="close-title">
            <IoCloseOutline
              className="form-close"
              onClick={() => setEdit(!edit)}
            />
            <div className="form-title">Edit Post</div>
          </div>
          <div className="file-upload">Update post image</div>

          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <input
            type="text"
            name="title"
            className="title-update"
            onChange={handleTitleChange}
            value={title}
          />
          <br />
          <textarea
            className="text-update"
            onChange={handleTextChange}
            value={text}
          ></textarea>
          <br />
          <button className="btns-update" onClick={updatePost}>
            Submit
          </button>
        </div>
      ) : (
        <div className="post-content">
          <div className="back" onClick={() => navigation("/home/posts")}>
            <IoArrowBack />
          </div>
          <div className="title">
            <div>{post.title}</div>

            <div>{new Date(post.timestamp).toDateString()}</div>
          </div>
          {post && post.imageUrl !== "" && (
            <div className="image">
              <img src={post.imageUrl} />
            </div>
          )}
          <p className="text">{post.text}</p>
          <div className="comments">
            <h4>{`Comments 
              ${post && post.comments && post.comments.length}`}</h4>
            {post && post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, i) => (
                <div key={i} className="comment">
                  <div>
                    <div className="comment-username">{comment.username}</div>
                    <div className="comment-text">{comment.commentText}</div>
                  </div>
                  <IoCloseOutline
                    className="delete-comment"
                    onClick={() => deleteComment(comment.id)}
                  />
                </div>
              ))
            ) : (
              <div style={{ fontSize: "1rem", fontWeight: "300" }}>
                No comments
              </div>
            )}
          </div>
          <div className="post-btns">
            <button onClick={() => setEdit(!edit)}>Edit</button>
            <button onClick={deletePost}>Delete</button>
            <button
              onClick={() =>
                post && post.published ? unpublishPost() : publishPost()
              }
            >
              {post && post.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
