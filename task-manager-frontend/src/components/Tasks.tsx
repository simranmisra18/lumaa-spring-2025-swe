import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editedTaskTitle, setEditedTaskTitle] = useState('');
    const [editedTaskDescription, setEditedTaskDescription] = useState('');
    const [editedTaskIsComplete, setEditedTaskIsComplete] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You need to log in first');
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:3000/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                alert('Failed to fetch tasks');
            }
        };

        fetchTasks();
    }, [navigate]);

    const handleCreateTask = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in first');
            navigate('/login');
            return;
        }

        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: newTaskTitle,
                description: newTaskDescription,
            }),
        });

        if (response.ok) {
            const newTask = await response.json();
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskTitle('');
            setNewTaskDescription('');
        } else {
            alert('Failed to create task');
        }
    };

    const handleEditTask = (task: Task) => {
        setEditingTaskId(task.id);
        setEditedTaskTitle(task.title);
        setEditedTaskDescription(task.description);
        setEditedTaskIsComplete(task.isComplete);
    };

    const handleUpdateTask = async (taskId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in first');
            navigate('/login');
            return;
        }

        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: editedTaskTitle,
                description: editedTaskDescription,
                isComplete: editedTaskIsComplete,
            }),
        });

        if (response.ok) {
            const updatedTask = await response.json();
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? updatedTask : task
                )
            );
            setEditingTaskId(null);
            setEditedTaskTitle('');
            setEditedTaskDescription('');
            setEditedTaskIsComplete(false);
        } else {
            alert('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in first');
            navigate('/login');
            return;
        }

        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } else {
            alert('Failed to delete task');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Tasks</h2>

            <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
            >
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Task Title"
                    style={{ padding: '8px', width: '300px' }}
                />
                <input
                    type="text"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Task Description"
                    style={{ padding: '8px', width: '300px' }}
                />
                <button
                    onClick={handleCreateTask}
                    style={{ padding: '8px', width: '310px', cursor: 'pointer' }}
                >
                    Add Task
                </button>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '8px',
                        width: '310px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Logout
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px auto', width: '50%' }}
                        >
                            {editingTaskId === task.id ? (
                                <div
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
                                >
                                    <input
                                        type="text"
                                        value={editedTaskTitle}
                                        onChange={(e) => setEditedTaskTitle(e.target.value)}
                                        placeholder="Edit Task Title"
                                        style={{ padding: '8px', width: '280px' }}
                                    />
                                    <input
                                        type="text"
                                        value={editedTaskDescription}
                                        onChange={(e) => setEditedTaskDescription(e.target.value)}
                                        placeholder="Edit Task Description"
                                        style={{ padding: '8px', width: '280px' }}
                                    />
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={editedTaskIsComplete}
                                            onChange={(e) => setEditedTaskIsComplete(e.target.checked)}
                                        />
                                        Mark as Complete
                                    </label>
                                    <button
                                        onClick={() => handleUpdateTask(task.id)}
                                        style={{ padding: '8px', width: '150px', cursor: 'pointer' }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingTaskId(null)}
                                        style={{ padding: '8px', width: '150px', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
                                        <strong>{task.title}</strong> - {task.description}
                                    </p>
                                    <button
                                        onClick={() => handleEditTask(task)}
                                        style={{ padding: '5px', width: '80px', marginRight: '5px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        style={{ padding: '5px', width: '80px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default Tasks;
