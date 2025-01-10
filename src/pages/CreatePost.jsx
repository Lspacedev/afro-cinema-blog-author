import { useState } from "react";
import { useNavigate } from "react-router";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const token = localStorage.getItem("token");
  async function createPost() {
    try {
      if (title === "" || text === "") {
        alert("Fields cannot be empty");
        return;
      }
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

      const res = await fetch(`http://localhost:3000/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigation("/home/posts");
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
  function handleTextChange(e) {
    setText(e.target.value);
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  return (
    <div className="CreatePost">
      <div className="text-editor">TEXT EDITOR</div>
      <div className="post-inputs">
        <div className="file-upload">
          Select post image
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <br />
        <input type="text" name="title" onChange={handleTitleChange} />
        <br />

        <textarea maxLength="1000" onChange={handleTextChange}></textarea>
        <br />
        <button onClick={loading ? console.log() : createPost}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
