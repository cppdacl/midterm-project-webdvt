import './SearchBar.css'

interface Props {
    value: string
    onChange: (val: string) => void
    placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = "Search..." }: Props) {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-bar"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}