import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";

function Nav() {
  const [currentTab, setCurrentTab] = useState("");
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const { post_id } = useParams();

  return (
    <div className="Nav">
      <div
        className={pathname === "/home" ? "current link" : "link"}
        onClick={() => {
          setCurrentTab("home");
          navigation("/home");
        }}
      >
        Home
      </div>
      <div
        className={
          pathname === "/home/posts" ||
          (post_id !== "" && typeof post_id !== "undefined")
            ? "current link"
            : "link"
        }
        onClick={() => {
          setCurrentTab("manage");
          navigation("/home/posts");
        }}
      >
        Manage Posts
      </div>
      <div
        className={pathname === "/home/create" ? "current link" : "link"}
        onClick={() => {
          setCurrentTab("create");
          navigation("/home/create");
        }}
      >
        Write A New Post
      </div>
    </div>
  );
}

export default Nav;
