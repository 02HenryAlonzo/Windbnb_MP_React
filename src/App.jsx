import React, { useState } from "react";
import './App.css'
import staysData from "./stays.json";
import { Card } from "./components/Card/Card";
import { Nav } from "./components/Nav/Nav";
import { SearchModal } from "./components/Nav/SearchModal";

function App() {
  const [stays, setStays] = useState(staysData);
  const [modalVisible, setModalVisible] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [visibleCount, setVisibleCount] = useState(6)

  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)

  const handleSearchResults = (results) => {
    setSearchResults(results)
    closeModal()
  }

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6)
  }

  return (
    <div>
      <Nav onSearchBarClick={openModal} />
      {modalVisible && <SearchModal onClose={closeModal} onSearch={handleSearchResults} />}
      
      <div className="title-container">
        <h1>Stays in Finland</h1>
        <p onClick={handleLoadMore}>12+ stays</p>
      </div>

      <div className="cards-container">
        {(searchResults.length > 0 ? searchResults : stays)
          .slice(0, visibleCount)
          .map(stay => (
              <Card key={stay.title} stay={stay} />
          ))
        }
      </div>

      <footer>
       <p>create by <a href="https://github.com/02HenryAlonzo" target="_blank">HenryAlonzo</a> - devChallenge.io</p>
      </footer>
    </div>
  );
}

export default App;
