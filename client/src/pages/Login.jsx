import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post("http://localhost:3002/login", { email, password })
            .then(result => {
                console.log(result.data);

                if (result.data === "success") {
                    // Save user token for protected routes
                    localStorage.setItem("token", "userLoggedIn");
                    navigate("/home");
                } else {
                    alert(result.data);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label><strong>Email</strong></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            className='form-control rounded-0'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label><strong>Password</strong></label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            className='form-control rounded-0'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Login
                    </button>
                </form>

                <p className='mt-2'>Don't have an Account?</p>
                <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none m-1'>Sign Up</Link>
                <Link to='/admin' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none m-1'>Admin</Link>
            </div>
        </div>
    )
}

export default Login
