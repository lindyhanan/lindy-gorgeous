import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Register() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    name:"",
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

    navigate("/login")
  }

  return (

    <div className="auth-form-wrap">

      <h2 className="auth-title">
        Create Account
      </h2>

      <p className="auth-subtitle">
        Gabung menjadi member Lindy Coffee
      </p>

      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
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
          Register
        </button>

      </form>

      <div className="auth-links">

        <Link to="/login">
          Already have account?
        </Link>

      </div>

    </div>
  )
}