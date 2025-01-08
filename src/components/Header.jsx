import { useNavigate } from "react-router";
import { CiLogout } from "react-icons/ci";
import { BsCameraReelsFill } from "react-icons/bs";
function Header() {
  const navigation = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigation("/");
  }
  return (
    <div className="Header">
      <div
        className="link"
        onClick={() => {
          navigation("/home");
        }}
      >
        <BsCameraReelsFill className="icon" />
        <div className="text">Afro-Cinema Blog Author</div>
      </div>
      <div className="link" onClick={logout}>
        <CiLogout className="icon" />
        <div className="text">Logout</div>
      </div>
    </div>
  );
}

export default Header;
