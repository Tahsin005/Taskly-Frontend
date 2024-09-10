import { Spinner } from '@material-tailwind/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [isLoading, setIsloading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleRegistration = (event) => {
        event.preventDefault();
        const { username, first_name, last_name, email, password, confirm_password } = formData;

        if (!username || !first_name || !last_name || !email || !password || !confirm_password) {
            toast.warning('Please fill out all fields.');
            return;
        }

        if (password !== confirm_password) {
            toast.error('Passwords do not match.');
            return;
        }
        setIsloading(true); 


        try {
            fetch("https://taskly-waa8.onrender.com/user/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (response.status === 200) {
                        setIsloading(false);
                        toast.success("Registration Successful.");
                        setTimeout(() => {
                            navigate('/login');
                        }, 2000);
                    } else {
                        setIsloading(false);
                        console.log("Registration failed with status code:", response.status);
                        toast.error(response.statusText);
                    }
                })
                .catch((error) => {
                    setIsloading(false);
                    console.log("Error during registration:", error);
                    toast.error("An error occurred during registration.");
                });
                
        } catch (err) {
            setIsloading(false);
            console.log(err);
            toast.error("An unexpected error occurred.");
        }
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
                    <h1 className='text-center text-4xl mt-4 font-semibold'>Register</h1>
                    <section className="py-5 mt-4 mb-10">
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
                                                className="mt-1 p-2 w-full input input-bordered"
                                                type="text"
                                                placeholder="Type Your Username"
                                                id="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                                autoComplete="username"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-1" htmlFor="first_name">First Name</label>
                                            <input
                                                className="mt-1 p-2 w-full input input-bordered"
                                                type="text"
                                                placeholder="Type Your First Name"
                                                id="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-1" htmlFor="last_name">Last Name</label>
                                            <input
                                                className="mt-1 p-2 w-full input input-bordered"
                                                type="text"
                                                placeholder="Type Your Last Name"
                                                id="last_name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                                            <input
                                                className="mt-1 p-2 w-full input input-bordered"
                                                type="email"
                                                placeholder="Type Your Email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                                            <input
                                                className="mt-1 p-2 w-full input input-bordered"
                                                type="password"
                                                placeholder="Type Your Password"
                                                id="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                                required
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium mb-1" htmlFor="confirm_password">Confirm Password</label>
                                            <input
                                                className="mt-1 p-2 w-full input input-bordered"
                                                type="password"
                                                placeholder="Confirm Your Password"
                                                id="confirm_password"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                                required
                                            />
                                        </div>
                                        <button onClick={handleRegistration}
                                            type="button"
                                            className="text-gray-900 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        >
                                            Register
                                        </button>


                                    </form>

                                    <h1 className='font-bold text-lg mt-4'>Already have an account? <span className='text-[#9FE88D]'><Link to={'/login'}>Login</Link></span></h1>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

        </>
    );
};

export default Register;

