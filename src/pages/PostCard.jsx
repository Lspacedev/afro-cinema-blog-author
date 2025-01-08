import { useEffect, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";

function PostCard({ post }) {
  const navigation = useNavigate();
  function handleNavigateSubPage() {
    navigation(`/home/posts/${post.id}`);
  }
  console.log({ post });
  return (
    <div className="PostCard" onClick={handleNavigateSubPage}>
      <div>{post.title}</div>
      <div className="time-pub">
        <div>{post.published ? "Published" : "Unpublished"}</div>
        <div>{new Date(post.timestamp).toDateString()}</div>
      </div>
    </div>
  );
}

export default PostCard;
