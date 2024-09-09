import { FaHouseLock } from "react-icons/fa6";
import { Link } from "react-router-dom";
const NotAuthenticatedPage = () => {
    return (
        <div className="h-screen">
            <div className="flex justify-center mt-24">
                <FaHouseLock className="text-center text-5xl md:text-8xl" />
            </div>
            <div className="mt-12">
                <p className="text-center text-3xl md:text-4xl"><span className="text-[#9FE88D]"><Link to={'/register'}>Register</Link></span> or <span className="text-[#9FE88D]"><Link to={'/login'}>Login</Link></span> to access & save you tasks.</p>
            </div>
        </div>
    );
};

export default NotAuthenticatedPage;