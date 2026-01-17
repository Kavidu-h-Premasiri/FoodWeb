import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        // Simple admin check (replace with your real backend API)
        if (email === "admin@gmail.com" && password === "admin123") {
            // Save admin token for protected admin routes
            localStorage.setItem("adminToken", "adminLoggedIn");
            navigate("/adminhome");
        } else {
            alert("Invalid admin credentials");
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='admin@gmail.com'
                            className='form-control rounded-0'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='admin123'
                            className='form-control rounded-0'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                </form>
                <p className='mt-2'>Back to User Login?</p>
                <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none m-1' onClick={() => navigate("/login")}>User Login</button>
            </div>
        </div>
    )
}

export default Admin
