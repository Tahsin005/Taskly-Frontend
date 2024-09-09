import { useState } from "react";

const MyTaskForm = ({ fetchTasks, isLoading }) => {
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const postTasks = () => {
        const token = localStorage.getItem('task_manager_token');
        if (token) {
            console.log(token);
        }

        if (!token) {
            console.log('No token found!');
            return;
        }

        fetch('http://127.0.0.1:8000/api/tasks/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
            .then(response => {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                }
                return response.json();
            })
            .then(data => {
                setNewTask({
                    title: '',
                    description: ''
                });
                fetchTasks();
            })
            .catch(error => {
                console.error('Error fetching tasks', error);
            });
    }
    return (
        <>
            <div className="mt-12">
                <h1 className="text-center font-semibold text-xl md:text-4xl">Add your tasks here..</h1>
            </div>
            <div className="pt-12">
                <input
                    type="text"
                    name="title"
                    placeholder="Title.."
                    className="mt-1 p-2 w-full input input-bordered"
                    onChange={handleChange}
                    value={newTask.title}
                />
                <br />
                <input
                    type="text"
                    name="description"
                    placeholder="Description.."
                    className="mt-4 p-2 w-full input input-bordered"
                    onChange={handleChange}
                    value={newTask.description}
                />
                <button onClick={postTasks}
                    type="button"
                    className="text-gray-900 inline-block mt-4 w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                    Add Todo
                </button>
            </div>
        </>
    );
};

export default MyTaskForm;