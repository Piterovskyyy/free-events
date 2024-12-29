import { useContext, useRef } from "react";
import { AiFillMoon, AiFillSun } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('UserProfile must be used within a UserProvider');
    }

    const { user, logout } = context;
    const dropdownRef = useRef<HTMLLIElement>(null);

    const handleLoginButton = () => {
        if(user) {
            logout();
        } else {
            navigate('/sign-in');
        }
    }

    const navigateFromDropdown = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, path: string) => {
        event.preventDefault();
        dropdownRef.current?.blur();
        navigate(path);
    }

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
                        <li ref={dropdownRef} onClick={(e) => navigateFromDropdown(e, '/')}><a>Strona Główna</a></li>
                        <li ref={dropdownRef} onClick={(e) => navigateFromDropdown(e, '/events')}><a>Wydarzenia</a></li>
                        {user && <li ref={dropdownRef} onClick={(e) => navigateFromDropdown(e, '/new-event')}><a>Dodaj wydarzenie</a></li> }
                    </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a onClick={() => navigate('/')} className="btn btn-ghost text-xl">Free Events 🎫</a>
                </div>
                <div className="navbar-end gap-2">
                    <p className="mr-3"> { user?.name }</p>
                    <AiFillSun className="w-[16px]"/>
                    <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                    <AiFillMoon className="w-[16px]"/>
                    <button className="btn btn-ghost btn-circle">
                    <div onClick={handleLoginButton} className="indicator">
                        {user ? <BiLogOut className="icon"/> : <BiLogIn className="icon"/>}
                    </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar;