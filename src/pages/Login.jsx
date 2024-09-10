import { Spinner } from '@material-tailwind/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
    
        if (!username || !password) {
            toast.error("Please fill in both username and password.");
            return;
        }
    
        setIsloading(true); 
    
        fetch("https://taskly-waa8.onrender.com/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token && data.user_id) {
                    localStorage.setItem("task_manager_token", data.token);
                    localStorage.setItem("task_manager_user_id", data.user_id);
                    const user_id = data.user_id;
    
                    fetch(`https://taskly-waa8.onrender.com/user/account/?user_id=${user_id}`)
                        .then((res) => res.json())
                        .then((value) => {
                            var ID = 0;
                            value.forEach(element => {
                                if (element.user === data.user_id) {
                                    ID = element.id;
                                }
                            });
    
                            if (data && value && ID) {
                                localStorage.setItem("task_manager_user_account", ID);
                                localStorage.setItem("task_manager_username", username);
                                setIsloading(false);
                                
                                toast.success('Logged in successfully');
                                
                                setTimeout(() => {
                                    navigate('/');
                                }, 2000); 
                            }
                        })
                        .catch((err) => {
                            console.error("Error fetching account details:", err);
                            toast.error("Failed to retrieve user account details.");
                            setIsloading(false); 
                        });
                } else {
                    toast.error("Invalid username or password.");
                    setIsloading(false); 
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
                toast.error("An error occurred while logging in. Please try again later.");
                setIsloading(false); 
            });
    };
    

    return (
        <>
            <ToastContainer />
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner className="h-12 w-12 text-[#9FE88D]" />
                </div>
            ) : (
                <>
                    <h1 className='text-center text-4xl mt-12 font-semibold'>Login</h1>

                    <section className="mt-12 min-h-screen flex align-top justify-center">
                        <div className="h-full">
                            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                                <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                                    <img
                                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        className="w-full"
                                        alt="Sample image"
                                    />
                                </div>

                                <div className="mb-12 md:mb-0 w-full md:w-8/12 lg:w-5/12 xl:w-5/12">
                                    <form>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>

                                            <input
                                                type="text"
                                                id="username-login"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="mt-1 p-2 w-full input input-bordered"
                                                placeholder="Enter your username"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                id="password-login"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="mt-1 p-2 w-full input input-bordered"
                                                placeholder="Enter your password"
                                            />
                                        </div>
                                        <button onClick={handleLogin}
                                            type="button"
                                            className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-gray-900 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                        >
                                            Login
                                        </button>
                                    </form>
                                    <h1 className='font-bold text-lg mt-4'>Don`t have an account? <span className='text-[#9FE88D]'><Link to={'/register'}>Register</Link></span></h1>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default Login;
