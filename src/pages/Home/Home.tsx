import { useApp } from "../../contexts/AppContext"
import SpaceCard from "../../components/SpaceCard/SpaceCard"
import SearchBar from "../../components/SearchBar/SearchBar"
import UserMenu from "../../components/UserMenu/UserMenu"
import { useState } from "react"
import './Home.css'

export default function Home() {
    const { spaces, loadingSpaces } = useApp()!
    const [search, setSearch] = useState("")

    if (loadingSpaces) return <p className="loading">Loading spaces...</p>

    const filteredSpaces = spaces.filter(space =>
        space.name.toLowerCase().includes(search.toLowerCase()) ||
        space.location.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="home-page">
            <UserMenu />

            <h1 className="home-title">StudySpot PH</h1>

            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search by name or location..."
            />

            <div className="home-container">
                {filteredSpaces.map(space => (
                    <SpaceCard key={space.id} space={space} />
                ))}
            </div>
        </div>
    )
}