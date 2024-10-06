import { useState } from "react";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    function createPost(){
      
        fetch("http://localhost:3000/api/posts",{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              title: title,
              text: text
            }),
          }).then((res)=> res.json()).then((data)=>alert(data.message))
    }
    function handleTextChange(e){
        setText(e.target.value);
    }
    function handleTitleChange(e){
        setTitle(e.target.value);
    }
    return (
      <div className='CreatePost'>
        <div>TEXT EDITOR</div>
        <div>
            <input type="text" name="title" onChange={handleTitleChange}/>
            <br/>
            <textarea onChange={handleTextChange}></textarea>
            <br/>
            <button onClick={createPost}>submit</button>
        </div>
       
      </div>
    )
  }
  
  export default CreatePost;
  