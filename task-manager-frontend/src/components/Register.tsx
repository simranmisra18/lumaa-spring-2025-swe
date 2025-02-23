
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
    id: number;
    title: string;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]); // Explicitly define the state type

    useEffect(() => {
        fetch('http://localhost:3000/tasks') // Replace with your actual backend URL
            .then(response => response.json())
            .then((data: Task[]) => setTasks(data)) // Ensure the response is of type Task[]
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div>
            <h2>Tasks</h2>
            {tasks.map((task) => (
                <div key={task.id}>{task.title}</div>
            ))}
        </div>
    );
};

export default Tasks;
