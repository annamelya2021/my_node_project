import { Outlet } from "react-router-dom";
import NavBar from "../navigation/Navigation";


const Layout = () => {
  return (
    <>
      <header >
        <NavBar />
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;