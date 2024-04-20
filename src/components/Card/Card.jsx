import React from "react"
import './Card.css'

export const Card = ({ stay }) => {
    return (
        <div className="card">
            <img src={stay.photo} alt={stay.title} />

            <div className="card-content">
                {stay.superHost && <span className="superhost">Superhost</span>}
                <h2>{stay.title}</h2>
                <p>Type: {stay.type}</p>
                <p>Max Guests: {stay.maxGuests}</p>
                <p>City: {stay.city}</p>
                <p>Rating: {stay.rating}</p>
            </div>
        </div>
    )
}