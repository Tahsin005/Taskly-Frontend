import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/authCheck";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLogOut } from "react-icons/io5";
const Header = () => {
    const is_Authenticated = isAuthenticated();
    const navigate = useNavigate();

    const handleLogout = () => {
        const token = localStorage.getItem("task_manager_token");

        if (!token) {
            alert("No token found. Already logged out.");
            return;
        }
        localStorage.removeItem('task_manager_token');
        localStorage.removeItem('task_manager_user_id');
        localStorage.removeItem('task_manager_user_account');
        localStorage.removeItem('task_manager_username');
        
        setTimeout(() => {
            toast.info('Logged Out Successfully');
        }, 500);
        navigate('/login');

       
    };
    return (
        <div className="max-w-screen-xl mx-auto ">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="bg-[#9FE88D] menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-40 p-2 shadow text-black sm:text-sm  ">
                            <li><Link to={'/tasks'}>My Tasks</Link></li>
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-lg md:text-xl">Taskly</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li className="bg-[#9FE88D] text-gray-900 font-semibold rounded"><Link to={'/tasks'}>My Tasks</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        !is_Authenticated ? <Link to={'/register'} className="btn btn-ghost  font-bold ">Register</Link> :
                            <button onClick={handleLogout} type="submit" className="btn btn-ghost hover:bg-[#9FE88D] hover:text-gray-900"><IoLogOut className="text-2xl" /></button>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Header;