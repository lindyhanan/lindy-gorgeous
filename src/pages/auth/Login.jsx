import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    localStorage.setItem("token", "login-success")

    navigate("/")
  }

  return (

    <div className="auth-form-wrap">

      <h2 className="auth-title">
        Login Account
      </h2>

      <p className="auth-subtitle">
        Masuk ke akun coffee member kamu
      </p>

      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >

        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

      <div className="auth-links">

        <Link to="/forgot">
          Forgot Password
        </Link>

        <Link to="/register">
          Create Account
        </Link>

      </div>

    </div>
  )
}