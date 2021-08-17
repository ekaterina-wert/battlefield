import './App.css';
import React from 'react';
import Main from './components/Main';
import ModalForName from './components/ModalForName';

function App() {
  const [showModal, setShowModal] = React.useState(true);
  const [playerName, setPlayerName] = React.useState('noname')

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
