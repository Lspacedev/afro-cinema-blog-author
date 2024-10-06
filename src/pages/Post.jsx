import { useEffect, useState } from "react";
import { useParams } from "react-router";
function Post() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { post_id } = useParams();

  useEffect(()=>{
    fetchPost();
  }, [])
  async function fetchPost(){
    const response = await fetch(`http://localhost:3000/api/posts/${post_id}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`


      }
    });
    const data = await response.json();
    setPost(data);
  }

  function handleTextChange(e){
    setText(e.target.value);
  }
    function handleTitleChange(e){
        setTitle(e.target.value);
    }
    function updatePost(){
      let data = {};
      if(title !=""){
        data.title = title;
      }
      if(text != ""){
        data.text = text;
      }
      if(JSON.stringify(data) !== "{}"){
        fetch(`http://localhost:3000/api/posts/${post_id}`,{
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
        }).then((res)=> res.json()).then((data)=>console.log(data))
      }
    }

  function publishPost() {
    let data = {publish: true}
    fetch(`http://localhost:3000/api/posts/${post_id}/publish`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then((res)=> res.json()).then((data)=>console.log(data))
  }
  function unpublishPost() {
    let data = {publish: false}
    fetch(`http://localhost:3000/api/posts/${post_id}/unpublish`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then((res)=> res.json()).then((data)=>console.log(data))
  }

  function deletePost(){ 
      fetch(`http://localhost:3000/api/posts/${post_id}`,{
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
      }).then((res)=> res.json()).then((data)=>console.log(data))
    
  }
  return (
      <div className='Post'>
          {edit === true ? 
          (
            <div>
              <input type="text" name="title" onChange={handleTitleChange}/>
              <br/>
              <textarea onChange={handleTextChange}></textarea>
              <br/>
              <p onClick={()=>setEdit(!edit)}>x</p>
              <button onClick={updatePost}>submit</button>
            </div>
      ):(
        <div className="post-content">
          <p>{post.title}</p>
          <p>{post.text}</p>
          <div>
            <h4>Comments</h4>
            
          </div>
          <div className="post-btns">
            <button onClick={()=>setEdit(!edit)}>Edit</button>
            <button onClick={deletePost}>Delete</button>
            <button onClick={publishPost}>Publish</button>
            <button onClick={unpublishPost}>Unpublish</button>

          </div>
        </div>
         )} 
      </div>
    )
  }
  
  export default Post;
  