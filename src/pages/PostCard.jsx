import { useEffect, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";

function PostCard({post}) {
    const navigation = useNavigate();

    function handleNavigateSubPage() {
        navigation(`/posts/${post.id}`);
      }
    return (
      <div className='PostCard' onClick={handleNavigateSubPage}>
        {post.title}
      </div>
    )
  }
  
  export default PostCard;
  