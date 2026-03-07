import { useState, useEffect } from "react"
import { useApp, type Space } from "../../contexts/AppContext"
import "./BookForm.css"

interface Props {
    space: Space
    onClose: () => void
}

export default function BookForm({ space, onClose }: Props) {
    const { user, addBooking } = useApp()
    const [date, setDate] = useState("")
    const [timeSlot, setTimeSlot] = useState("")
    const [error, setError] = useState("")
    const [totalPrice, setTotalPrice] = useState(space.price)
    const [success, setSuccess] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setTotalPrice(space.price)
    }, [space.price])

    const today = new Date().toISOString().split("T")[0]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (disabled) return
        if (!date) return setError("Please select a date")
        if (!timeSlot) return setError("Please select a time slot")
        if (!user) return setError("Please login first")

        addBooking({
            id: crypto.randomUUID(),
            spaceId: space.id,
            spaceName: space.name,
            date,
            timeSlot,
            username: user,
        })

        setSuccess(true)
        setDisabled(true)
        setError("")

        setTimeout(() => {
            onClose()
        }, 2500)
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).classList.contains("bookform-overlay")) {
            onClose()
        }
    }

    return (
        <>
            <div className="bookform-overlay" onClick={handleOverlayClick}>
                <div className="bookform-modal">
                    <button className="close-btn" onClick={onClose}>×</button>
                    <h2>Book {space.name}</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Select Date:
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={today}
                                required
                            />
                        </label>

                        <label>
                            Select Time Slot:
                            <select
                                value={timeSlot}
                                onChange={(e) => setTimeSlot(e.target.value)}
                                required
                            >
                                <option value="">-- Choose a time slot --</option>
                                {space.time_slots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <p className="total-price">Total: ₱{totalPrice}</p>

                        <button
                            type="submit"
                            className="book-btn"
                            disabled={disabled}
                        >
                            {disabled ? "Booking..." : "Confirm Booking"}
                        </button>
                    </form>
                </div>
            </div>
            {success && (
                <div className="booking-success">
                    Successfully Booked!
                </div>
            )}
        </>
    )
}