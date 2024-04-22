import React from "react"
import './Card.css'

export const Card = ({ stay }) => {
    const formatTypeAndBeds = () => {
        const bedText = stay.beds === 1 ? 'bed' : 'beds'
        return `${stay.type}${stay.beds ? `. ${stay.beds} ${bedText}` : ''}`;
    }

    return (
        <div className="card">
            <img src={stay.photo} alt={stay.title} />

            <div className="card-content">
                <div className="card-description">
                    {stay.superHost && <span className="superhost">Super host</span>}
                    <p className="type-beds">{formatTypeAndBeds()}</p>
                    <p className="rating"><i className="fa-solid fa-star"></i>{stay.rating}</p>
                </div>
                <h2>{stay.title}</h2>
            </div>
        </div>
    )
}