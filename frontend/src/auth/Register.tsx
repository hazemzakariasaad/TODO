import React, { useState } from 'react'
import { MdOutlineEmail } from 'react-icons/md'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export const Register = () => {
  const [showPassword, setShowPassword]           = useState(false)
  const [name, setName]                   = useState('')
  const [email, setEmail]                         = useState('')
  const [password, setPassword]                   = useState('')
  const [confirmPassword, setConfirmPassword]     = useState('')
  const [error, setError]                         = useState('')
  const [success, setSuccess]                     = useState('')
  const navigate                                  = useNavigate()

  const togglePasswordVisibility = () =>
    setShowPassword(v => !v)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // clear messages
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      })

      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to login…')
        // redirect after a short delay
        setTimeout(() => navigate('/'), 2000)
      }
    } catch (err: any) {
      // if your API returns { message: '...' }
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Registration failed. Please try again.'
      setError(msg)
    }
  }

  return (
    <div className="wrapper">
      <div className="form-box Register">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <h1>Register</h1>

            <div className="inputbox">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <FaUser className="icon" />
              <label htmlFor="name">Username</label>
            </div>

            <div className="inputbox">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <MdOutlineEmail className="icon" />
              <label htmlFor="email">Email</label>
            </div>

            <div className="inputbox">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <FaLock className="icon" />
              <label htmlFor="password">Password</label>
            </div>

            <div className="inputbox">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <FaLock className="icon" />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
