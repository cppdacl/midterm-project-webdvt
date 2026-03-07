import { MdOutlineErrorOutline } from "react-icons/md"
import { Link } from "react-router-dom"
import './Unknown.css'

export default function Unknown() {
    return (
        <div className="unknown-container">
            <MdOutlineErrorOutline className="unknown-icon" />
            <h1>404</h1>
            <p>Oops! Page not found.</p>
            <Link to="/" className="home-btn">
                Go Back Home
            </Link>
        </div>
    )
}