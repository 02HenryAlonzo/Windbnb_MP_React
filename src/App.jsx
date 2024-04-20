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

  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)

  const hadleSearchResults = (results) => {
    setSearchResults(results)
    closeModal()
  }

  return (
    <div>
      <Nav onSearchBarClick={openModal} />
      {modalVisible && <SearchModal onClose={closeModal} onSearch={hadleSearchResults} />}
      
      <h1>Stays in Finland</h1>

      <div className="cards-container">
        {searchResults.length > 0 ? (
              searchResults.map(stay => (
                  <Card key={stay.title} stay={stay} />
              ))
          ) : (
              stays.map(stay => (
                  <Card key={stay.title} stay={stay} />
              ))
          )}
      </div>
    </div>
  );
}

export default App;
