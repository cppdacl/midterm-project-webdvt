import { Navigate } from "react-router-dom"
import { useApp } from "../../contexts/AppContext"
import type { JSX } from "react"

interface ProtectedRouteProps {
    children: JSX.Element
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useApp()!
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}