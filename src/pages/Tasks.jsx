import { useEffect, useState } from "react";
import MyTaskForm from "./MyTaskForm";
import Table from "./Table";


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchTasks = async () => {
        const token = localStorage.getItem('task_manager_token');
        if (token) {
            console.log(token);
        }

        if (!token) {
            console.log('No token found!');
            return;
        }

        fetch('https://taskly-waa8.onrender.com/api/tasks/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 403) {
                    throw new Error('Forbidden');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTasks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tasks', error);
            });
    };

    useEffect(() => {
        fetchTasks();
    }, []);
    return (
        <div>
            <MyTaskForm fetchTasks={fetchTasks} isLoading={isLoading}></MyTaskForm>
            <Table fetchTasks={fetchTasks} setTasks={setTasks} tasks={tasks} isLoading={isLoading} ></Table>
        </div>
    );
};

export default Tasks;