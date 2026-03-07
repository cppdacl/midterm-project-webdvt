import { useApp, type Space as SpaceType } from "../../contexts/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import UserMenu from "../../components/UserMenu/UserMenu";
import BookForm from "../../components/BookForm/BookForm";
import { useState, useEffect } from "react";
import './Space.css';
import Unknown from "../Unknown/Unknown";

export default function Space() {
    const { spaceId } = useParams<{ spaceId: string }>();
    const { user, spaces, bookings, cancelBooking } = useApp()!;
    const navigate = useNavigate();

    const space = spaces.find(s => s.id === Number(spaceId)) as SpaceType | undefined;

    const images = [
        `/images/space-${spaceId}-1.png`,
        `/images/space-${spaceId}-2.png`,
        `/images/space-${spaceId}-3.png`
    ];

    const [showModal, setShowModal] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    useEffect(() => {
        if (user && space) {
            const booked = bookings.some(b => b.spaceId === space.id && b.username === user);
            setAlreadyBooked(booked);
        }
    }, [bookings, space, user]);

    if (!space) return <Unknown />;

    const handleCancelBooking = () => {
        if (!user) return navigate("/login");

        const booking = bookings.find(b => b.spaceId === space.id && b.username === user);
        if (booking) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="space-page">
            <UserMenu />

            <button className="back-btn" onClick={() => navigate("/")}>
                ← Back to Home
            </button>

            <div className="space-images">
                {images.map((image, index) => (
                    <div className="image-container" key={index}>
                        <img
                            src={image}
                            alt={`Space ${spaceId} ${index + 1}`}
                            className="space-image"
                            onError={e => (e.currentTarget.src = "https://placehold.co/600x400")}
                        />
                    </div>
                ))}
            </div>

            <div className="space-info-container">
                <h1>{space.name}</h1>
                <p className="space-location">{space.location}</p>
                <p className="space-description">{space.description}</p>

                <div className="space-amenities">
                    {space.amenities.map((amenity, index) => (
                        <span className="amenity-tag" key={index}>{amenity}</span>
                    ))}
                </div>

                <p className="space-description">Available Booking Times</p>

                <div className="space-info-split">
                    <div className="time-slots">
                        {space.time_slots.map((slot, index) => (
                            <span className="time-slot-tag" key={index}>{slot}</span>
                        ))}
                    </div>
                    <div className="price-label">
                        ₱{space.price} / Slot
                    </div>
                </div>

                {alreadyBooked ? (
                    <button
                        className="book-btn cancel"
                        onClick={handleCancelBooking}
                    >
                        See Booking
                    </button>
                ) : (
                    <button
                        className="book-btn book"
                        onClick={() => {
                            if (!user) return navigate("/login");
                            setShowModal(true);
                        }}
                    >
                        Book Now
                    </button>
                )}
            </div>

            {showModal && !alreadyBooked && (
                <BookForm
                    space={space}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}