import { useApp } from "../../contexts/AppContext"
import { Link } from "react-router-dom"
import './UserMenu.css'

export default function UserMenu() {
    const { user, logout } = useApp()!

    const profileImage = user
        ? "https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds"
        : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"

    return (
        <div className="floating-user">
            <img
                src={profileImage}
                alt="Profile"
                className="user-pfp"
            />
            <span>{user || "Guest"}</span>

            {user ? (
                <>
                    <Link to="/dashboard" className="user-btn">Dashboard</Link>
                    <button onClick={logout} className="user-btn logout">Logout</button>
                </>
            ) : (
                <Link to="/login" className="user-btn">Sign In</Link>
            )}
        </div>
    )
}