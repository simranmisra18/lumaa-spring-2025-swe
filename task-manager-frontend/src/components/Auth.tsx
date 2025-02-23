
import { useState } from 'react';
import axios from 'axios';

const Auth = ({ type }: { type: 'login' | 'register' }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = `http://localhost:3000/auth/${type}`;
        const { data } = await axios.post(endpoint, { username, password });

        if (type === 'login') localStorage.setItem('token', data.access_token);
        window.location.href = '/tasks';
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">{type}</button>
        </form>
    );
};

export default Auth;
