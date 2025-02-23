import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, confirmPassword }),
        });

        if (response.ok) {
            alert('Registration successful! You can now log in.');
            navigate('/login');
        } else {
            alert('Error registering user');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Register</h2>
            <form
                onSubmit={handleRegister}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: '8px', width: '200px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '8px', width: '200px' }}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ padding: '8px', width: '200px' }}
                />
                <button
                    type="submit"
                    style={{ padding: '8px', width: '210px', cursor: 'pointer' }}
                >
                    Register
                </button>
            </form>
            <p>
                Already have an account?{' '}
                <span
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('/login')}
                >
                    Login here
                </span>
            </p>
        </div>
    );
};

export default Register;
