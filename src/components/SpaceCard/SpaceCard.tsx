import type { Space } from "../../contexts/AppContext";
import { Link } from "react-router-dom";
import './SpaceCard.css';

interface Props {
    space: Space;
}

export default function SpaceCard({ space }: Props) {
    const imagePath = `/images/space-${space.id}-1.png`;

    return (
        <Link to={`/space/${space.id}`} className="space-card">
            <div className="space-image">
                <img
                    src={imagePath}
                    alt={space.name}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/600x400";
                    }}
                />
            </div>
            <div className="space-info">
                <h2>{space.name}</h2>
                <p>{space.location}</p>
                <p className="price">₱{space.price} / Slot</p>
            </div>
        </Link>
    );
}