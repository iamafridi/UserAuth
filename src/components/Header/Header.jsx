import { NavLink } from "react-router-dom";

const Header = () => {

const navlink = <>

<li><NavLink to="/"> Home </NavLink></li>
<li><NavLink to="/signin" >Sign In</NavLink></li>
<li><NavLink to="/signup" >Sign Up</NavLink></li>

</>


    return (
        
        <div className="navbar bg-base-100 ">
        <div className="flex-1 ">
          <a className="btn btn-ghost normal-case text-xl">User Auth</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
           {navlink}
          </ul>
        </div>
      </div>
    );
};

export default Header;