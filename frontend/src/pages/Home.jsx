import React from 'react';
import JobList from '../components/JobList';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div>
            <h1>Job Posting App</h1>
            {token ? (
                <div>
                    <p>Welcome! You are logged in.</p>
                    <Link to="/post">Post a Job</Link>
                    <button onClick={handleLogout}>Logout</button>
                    <JobList />
                </div>
            ) : (
                <div>
                    <p>Please login or register to post jobs.</p>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                    <JobList />
                </div>
            )}
        </div>
    );
};

export default Home;
