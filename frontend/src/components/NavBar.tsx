import { AiFillMoon, AiFillSun } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="absolute top-0 w-full">
            <div className="navbar sticky bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a onClick={() => navigate('/')} className="btn btn-ghost text-xl">Free Events 🎫</a>
                </div>
                <div className="navbar-end gap-2">
                    <AiFillSun className="w-[16px]"/>
                    <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                    <AiFillMoon className="w-[16px]"/>
                    <button className="btn btn-ghost btn-circle">
                    <div onClick={() => navigate('/sign-in')} className="indicator">
                        <BiLogIn className="icon"/>
                    </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar;