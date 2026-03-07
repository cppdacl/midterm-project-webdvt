import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../../contexts/AppContext"
import './Login.css'

export default function Login() {
    const { login } = useApp()!
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = username.trim().toLowerCase()
        const valid = /^[a-z0-9_]{3,32}$/.test(trimmed)
        if (!valid) {
            setError("Username must be 3-32 characters, letters, numbers or underscores only.")
            return
        }
        login(trimmed)
        navigate("/dashboard")
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>StudySpot PH</h1>
                <p>Login with your username</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError("") }}
                        autoFocus
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}