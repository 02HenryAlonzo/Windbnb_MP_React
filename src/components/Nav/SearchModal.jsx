import React, { useEffect, useState } from 'react';
import './Nav.css';
import staysData from '../../stays.json'

export const SearchModal = ({ onClose, onSearch, }) => {
    const [location, setLocation] = useState('');
    const [guests, setGuests] = useState('');
    const [showCitiesDropdown, setShowCitiesDropdown] = useState(false);
    const [showGuestsCounter, setShowGuestsCounter] = useState(false);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [cities, setCities] = useState([])

    useEffect(() => {
        const cityCountryPairs = staysData.map(stay => ({
            city: stay.city,
            country: stay.country,
        }))

        const uniqueCityCountryPairs = Array.from(new Set(cityCountryPairs.map(pair => JSON.stringify(pair))))
            .map(str => JSON.parse(str))

        setCities(uniqueCityCountryPairs)
    }, [])

    const handleAdultsIncrement = () => {
        setAdults(adults + 1);
      };
      
    const handleAdultsDecrement = () => {
        if (adults > 0) {
          setAdults(adults - 1);
        }
      };
      
    const handleChildrenIncrement = () => {
        setChildren(children + 1);
      };
      
    const handleChildrenDecrement = () => {
        if (children > 0) {
          setChildren(children - 1);
        }
      };

    const totalGuests = adults + children
   
    const hadleBackdropClick = (evento) => {
        if (evento.target === evento.currentTarget) {
            onClose()
        }
    }

    const hadleSearch = () => {
        const locationCity = location.split(',')[0].trim()
        const filteredStays = staysData.filter(stay => {
            const cityMatch = stay.city.toLowerCase() === locationCity.toLowerCase()
            const guestsMatch = stay.maxGuests >= adults + children
            return cityMatch && guestsMatch
        })

        console.log("filteres stays ",filteredStays);
        onSearch(filteredStays)
    }

    return (
        <div className="modal-backdrop" onClick={hadleBackdropClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-search-bar">
                    <div className="modal-search-item" onClick={() => {setShowCitiesDropdown(!showCitiesDropdown); setShowGuestsCounter(false)}}>
                        <label htmlFor="location">location</label>
                        <input
                            id='location'
                            type="text"
                            placeholder="Add location"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className="modal-input"
                        />
                        {showCitiesDropdown && (
                            <div className='cities-dropdown'>
                                {cities.map(({city, country}) => (
                                    <div
                                        key={`${city}, ${country}`}
                                        className='city-item'
                                        onClick={() => {
                                            setLocation(`${city}, ${country}`);
                                            setShowCitiesDropdown(false);
                                        }}
                                    >
                                       <i className="fa-solid fa-location-dot"></i>{city}, {country}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="modal-search-item" onClick={(e) => {
                            if (!e.target.closest(".guests-counter")) {
                                setShowGuestsCounter(!showGuestsCounter);
                                setShowCitiesDropdown(false);
                            }
                        }}
                    >
                        <label htmlFor="guests">guests</label>
                        <input
                            id='guests'
                            type="text"
                            placeholder="Add guests"
                            value={totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : ''}
                            onChange={e => setGuests(e.target.value)}
                            className="modal-input"
                        />
                        {showGuestsCounter && (
                            <div className="guests-counter" onClick={(e) => e.stopPropagation()}>
                                <div>
                                    <span>Adults</span>
                                    <p>Ages 13 or above</p>
                                    <div className="counter">
                                        <button onClick={handleAdultsDecrement}>-</button>
                                        <span>{adults}</span>
                                        <button onClick={handleAdultsIncrement}>+</button>
                                    </div>
                                </div>
                                <div>
                                    <span>Children</span>
                                    <p>Ages 2-12</p>
                                    <div className="counter">
                                        <button onClick={handleChildrenDecrement}>-</button>
                                        <span>{children}</span>
                                        <button onClick={handleChildrenIncrement}>+</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-search-item">
                        <button onClick={hadleSearch} className="search-button"><i className="fa-solid fa-magnifying-glass"></i>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

