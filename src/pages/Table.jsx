import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PropTypes from 'prop-types';
import axios from "axios";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";


const Table = ({ tasks, setTasks, isLoading }) => {
    const [editText, setEditText] = useState({
        title: '',
        description: '',
    });

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('task_manager_token');
            if (!token) {
                console.error('No token found!');
                return;
            }

            await axios.delete(`https://taskly-waa8.onrender.com/api/tasks/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });
            const newList = tasks.filter(todo => todo.id !== id);
            setTasks(newList);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (id, value) => {
        try {
            const token = localStorage.getItem('task_manager_token');  // Retrieve the token

            if (!token) {
                console.error('No token found!');
                return;
            }

            const response = await axios.patch(`https://taskly-waa8.onrender.com/api/tasks/${id}/`, value, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.data || !response.data.id) {
                console.error('Unexpected response data:', response.data);
                return;
            }

            const updatedTasks = tasks.map(task => {
                if (task.id === id) {
                    return response.data;
                }
                return task;
            });

            setTasks(updatedTasks);

        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditText(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center w-full">
            <div className="py-12 w-full">
                <table className="w-full">
                    <thead className="border-b-2 border-black">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Title</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Description</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Created</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <div className="fixed inset-0 flex items-center justify-center bg-[#2A303C] z-50">
                                <Spinner className="h-12 w-12 text-[#9FE88D]" />
                            </div> :
                                <>
                                    {
                                        tasks.map((task, index) => {
                                            return (
                                                <tr key={index} className="border-b-[1px] border-dashed border-black">
                                                    <td className="p-3 text-lg">{task.title}</td>
                                                    <td className="p-3 text-lg">{task.description}</td>
                                                    <td className="p-3 text-lg">{new Date(task.created_at).toLocaleString()}</td>
                                                    <td className="p-3 text-lg flex justify-start gap-x-8">
                                                        <FaEdit onClick={() => {
                                                            document.getElementById('my_modal_1').showModal();
                                                            setEditText(task);
                                                        }} className="text-lg hover:cursor-pointer"></FaEdit>
                                                        <MdDeleteForever onClick={() => handleDelete(task.id)} className="text-lg hover:cursor-pointer"></MdDeleteForever>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </>
                        }
                    </tbody>
                </table>

                {/* Modal */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Edit To Do!</h3>
                        <input
                            type="text"
                            name="title"
                            className="mt-1 p-2 w-full input input-bordered"
                            value={editText.title}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="description"
                            className="mt-4 p-2 w-full input input-bordered"
                            value={editText.description}
                            onChange={handleChange}
                        />
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="text-gray-900 inline-block mt-4 w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" onClick={() => handleEdit(editText.id, editText)}>Edit</button>
                                <button className="text-white inline-block mt-4 w-full rounded bg-red-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>

    );
};
Table.propTypes = {
    tasks: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setTasks: PropTypes.func.isRequired,
};
export default Table;
