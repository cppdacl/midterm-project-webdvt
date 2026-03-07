import { useApp, type Booking, type Space } from "../../contexts/AppContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UserMenu from "../../components/UserMenu/UserMenu"
import SearchBar from "../../components/SearchBar/SearchBar"
import './Dashboard.css'

export default function Dashboard() {
    const { user, bookings, cancelBooking, spaces } = useApp()!
    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    const userBookings = bookings
        .filter(b => b.username === user)
        .filter(b => {
            const space = spaces.find(s => s.id === b.spaceId)
            return space ? space.name.toLowerCase().includes(search.toLowerCase()) : false
        })

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

    const handleCancelClick = (booking: Booking) => {
        setSelectedBooking(booking)
        setModalOpen(true)
    }

    const confirmCancel = () => {
        if (selectedBooking) cancelBooking(selectedBooking.id)
        setModalOpen(false)
        setSelectedBooking(null)
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-topbar">
                <button className="back-btn" onClick={() => navigate(-1)}>← Return</button>
                <UserMenu />
            </div>
            <h1>My Bookings</h1>
            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search bookings..."
            />

            {userBookings.length === 0 ? (
                <div className="no-bookings">
                    <span className="no-bookings-icon">📭</span>
                    <p>No active bookings found</p>
                </div>
            ) : (
                <div className="bookings-list">
                    {userBookings.map(b => {
                        const space: Space | undefined = spaces.find(s => s.id === b.spaceId)
                        if (!space) return null

                        const imagePath = `/images/space-${space.id}-1.png`;

                        return (
                            <div className="booking-card" key={b.id}>
                                <div className="booking-thumbnail">
                                    <img
                                        src={imagePath}
                                        alt={space.name}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://placehold.co/600x400";
                                        }}
                                    />
                                </div>
                                <div className="booking-info">
                                    <h2>{space.name}</h2>
                                    <p><strong>Date:</strong> {b.date}</p>
                                    <p><strong>Time Slot:</strong> {b.timeSlot}</p>
                                    <p><strong>Price:</strong> ₱{space.price}</p>
                                    <button className="book-btn cancel" onClick={() => handleCancelClick(b)}>
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {modalOpen && selectedBooking && (
                <div
                    className="bookform-overlay"
                    onClick={e => {
                        if ((e.target as HTMLDivElement).classList.contains("bookform-overlay")) {
                            setModalOpen(false)
                            setSelectedBooking(null)
                        }
                    }}
                >
                    <div className="bookform-modal">
                        <h2>Cancel Booking</h2>
                        <p>Are you sure you want to cancel your booking for <strong>{selectedBooking.spaceName}</strong> on <strong>{selectedBooking.date}</strong> ({selectedBooking.timeSlot})?</p>
                        <div className="modal-buttons">
                            <button className="book-btn cancel" onClick={confirmCancel}>Yes, Cancel</button>
                            <button className="book-btn" onClick={() => setModalOpen(false)}>No, Keep</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}