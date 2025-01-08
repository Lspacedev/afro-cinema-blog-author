import Nav from "../components/Nav";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <Header />
      <Nav />
      <Outlet />
    </div>
  );
}

export default Home;
