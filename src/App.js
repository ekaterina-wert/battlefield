import './App.css';
import React from 'react';
import Main from './components/Main';
import ModalForName from './components/ModalForName';

function App() {
  const [showModal, setShowModal] = React.useState(true); // стейт для закрытия,открытия модального окна
  const [playerName, setPlayerName] = React.useState('noname'); // стейт для хранения имени игрока

  function handleSubmitName(playerName) {
    playerName && setPlayerName(playerName);
    setShowModal(false);
  }

  function handlePopupClose() {
    setShowModal(false);
  }

  return (
    <div className="App">
      <Main
        playerName={playerName}
      />
      <ModalForName
        isOpen={showModal}
        onNameSubmit={handleSubmitName}
        onClose={handlePopupClose}
      />
    </div>
  );
}

export default App;
