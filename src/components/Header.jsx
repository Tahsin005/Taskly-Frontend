import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/authCheck";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        
        setTimeout(() => {
            toast.success('Logged Out Successfully');
        }, 3000);

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
                            className="bg-[#9FE88D] menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-black text-l font-semibold">
                            <li><Link to={'/tasks'}>My Tasks</Link></li>
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-xl">Task Manager</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to={'/tasks'}>My Tasks</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        !is_Authenticated ? <Link to={'/register'} className="btn btn-ghost bg-[#9FE88D] font-bold text-black">Register</Link> :
                            <button onClick={handleLogout} type="submit" className="btn btn-ghost bg-[#9FE88D] font-bold text-black">Logout</button>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Header;