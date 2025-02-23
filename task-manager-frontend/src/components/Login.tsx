import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            navigate('/tasks'); // Redirect to tasks page on successful login
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Login</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '8px', width: '200px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '8px', width: '200px' }}
                />
                <button onClick={handleLogin} style={{ padding: '8px', width: '210px', cursor: 'pointer' }}>
                    Login
                </button>
            </div>
            <p>
                Don't have an account?{' '}
                <span
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('/register')}
                >
                    Register here
                </span>
            </p>
        </div>
    );
};

export default Login;
