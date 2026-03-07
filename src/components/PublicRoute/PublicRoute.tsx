import { Navigate } from "react-router-dom"
import { useApp } from "../../contexts/AppContext"
import type { JSX } from "react"

interface PublicRouteProps {
    children: JSX.Element
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const { user } = useApp()!
    if (user) {
        return <Navigate to="/" replace />
    }
    return children
}