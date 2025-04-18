// src/pages/Login.tsx

import React, { useState } from 'react'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { setToken } from './authUtils'

export const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmai] = useState('')
  const [password, setPassword]   = useState('')
  const [error, setError]  = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password })
      console.log('DAta:', data.token)
      console.log('DAta:', data.accessToken)
      console.log('DAta:', data)
      setToken(data.access_token)
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err)
      const msg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      'Registration failed. Please try again.'
    setError(msg)
      // you could also set an error state and show a message here
    }
  }

  return (
    <div className="wrapper">
      <div className="form-box Login">
        <div className="form-value">
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="inputbox">
              <input
                type="text"
                name="email"
                required
                value={email}
                onChange={e => setEmai(e.target.value)}
              />
              <FaUser className="icon" />
              <label htmlFor="username">Email</label>
            </div>

            <div className="inputbox">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {showPassword
                ? <FaEye   className="toggle-password" onClick={() => setShowPassword(false)} />
                : <FaEyeSlash className="toggle-password" onClick={() => setShowPassword(true)} />}
              <FaLock className="icon" />
              <label htmlFor="password">Password</label>
            </div>

            <div className="remember-forget">
              <label htmlFor="remember-me">
                <input type="checkbox" id="remember-me" /> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>

            <div className="register-link">
              <p>
                Don't have an account?{' '}
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    navigate('/register')
                  }}
                >
                  Register
                </a>
              </p>
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
