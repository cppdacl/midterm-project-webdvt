import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

export interface Space {
    id: number
    name: string
    location: string
    price: number
    main_image: string
    images: string[]
    description: string
    amenities: string[]
    hours: string
    time_slots: string[]
}

export interface Booking {
    id: string
    spaceId: number
    spaceName: string
    date: string
    timeSlot: string
    username: string
}

interface AppContextType {
    user: string
    login: (name: string) => void
    logout: () => void
    spaces: Space[]
    bookings: Booking[]
    addBooking: (b: Booking) => void
    cancelBooking: (id: string) => void
    loadingSpaces: boolean
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useLocalStorage("username", "")
    const login = (name: string) => setUser(name.toLowerCase())
    const logout = () => setUser("")

    const [spaces, setSpaces] = useState<Space[]>([])
    const [loadingSpaces, setLoadingSpaces] = useState(true)

    useEffect(() => {
        fetch("/spaces.json")
            .then((res) => res.json())
            .then((data) => {
                setSpaces(data)
                setLoadingSpaces(false)
            })
            .catch(() => setLoadingSpaces(false))
    }, [])

    const [bookings, setBookings] = useLocalStorage<Booking[]>("bookings", [])
    const addBooking = (b: Booking) => setBookings([...bookings, b])
    const cancelBooking = (id: string) =>
        setBookings(bookings.filter((b) => b.id !== id))

    return (
        <AppContext.Provider
            value={{
                user,
                login,
                logout,
                spaces,
                bookings,
                addBooking,
                cancelBooking,
                loadingSpaces,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)!