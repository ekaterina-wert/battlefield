import './Main.css';
import React from 'react';
import BattleField from './BattleField';
import ModalGameOver from './ModalGameOver';
import { renderField } from '../utils/fields';

function Main(props) {
  // стейт для определения очередности хода игроков
  const [activePlayer, setActivePlayer] = React.useState({
    computer: true,
    human: false,
  });

  // стейты игровых полей
  const [computerField, setComputerField] = React.useState(renderField());
  const [humanField, setHumanField] = React.useState(renderField());

  // стейт для массива пустых ячеек поля, по которым стреляет компьютер
  const [shotsArray, setShotsArray] = React.useState(getArray());

  // ячейка, по которой стреляет компьютер
  const [computerShot, setComputerShot] = React.useState(null);

  // стейты по окончании игры: вызов модального окна и рестарт игры
  const [gameOver, setGameOver] = React.useState(false);
  const [restart, setRestart] = React.useState(true);

  // получить общую очередность рандомных ходов компьютера
  function getArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array[i] = i;
    }

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // логика выстрела компьютера: из массива ходов компьютера shotsArray выбирается последнее значение и затем удаляется из стейта
  function getUniqueShot() {
    return shotsArray.pop();
  }

  function computerMove() {
    setComputerShot(getUniqueShot());
    setTimeout(() => {
      setActivePlayer({
        computer: true,
        human: false,
      });
    }, 2000);
  }

  // элементарная логика компьютера при "ранении" вражеского корабля: обстрел соседней ячейки
  function computerSimpleLogic() {
    if (computerShot % 10 < 9 && shotsArray.includes(computerShot + 1)) {
      setTimeout(() => setComputerShot(computerShot + 1), 1000);
      shotsArray.splice(shotsArray.indexOf(computerShot + 1), 1);
      setShotsArray(shotsArray);
    } else if (computerShot % 10 !== 0 && shotsArray.includes(computerShot - 1)) {
      setTimeout(() => setComputerShot(computerShot - 1), 1000);
      shotsArray.splice(shotsArray.indexOf(computerShot - 1), 1);
      setShotsArray(shotsArray);
    } else if (computerShot / 10 > 1 && shotsArray.includes(computerShot - 10)) {
      setTimeout(() => setComputerShot(computerShot - 10), 1000);
      shotsArray.splice(shotsArray.indexOf(computerShot - 10), 1);
      setShotsArray(shotsArray);
    } else if (computerShot / 10 < 9 && shotsArray.includes(computerShot + 10)) {
      setTimeout(() => setComputerShot(computerShot + 10), 1000);
      shotsArray.splice(shotsArray.indexOf(computerShot + 10), 1);
      setShotsArray(shotsArray);
    } else setTimeout(computerMove, 800);
  }

  function handleOnClick(data) {
    if (data.hurt) {
      computerSimpleLogic();
    } else {

      // при промахе игрока, ход переходит к противнику благодаря стейту activePlayer
      data.isMissed && setActivePlayer({
        computer: !activePlayer.computer,
        human: !activePlayer.human,
      });
      data.isMissed && setTimeout(computerMove, 800);

      // при поднятии инфо о том, что все корабли уничтожены, запускается модальное окно с предложением начать новую игру
      if (data.gameOver) {
        setTimeout(() => {
          setGameOver(true);
          setRestart(false);
        }, 900)
      }
    }
  }

  function handleOnRestart() {
    setGameOver(false);
    setRestart(true);
    setComputerField(renderField());
    setHumanField(renderField());
  }

  return (
    <div className="main">
      <div className="main__title-container">
        <span className="main__ascii-art">:::::::::      :::     ::::::::::: ::::::::::: :::        ::::::::::  ::::::::  :::    ::: ::::::::::: :::::::::  </span>
        <span className="main__ascii-art">:+:    :+:   :+: :+:       :+:         :+:     :+:        :+:        :+:    :+: :+:    :+:     :+:     :+:    :+: </span>
        <span className="main__ascii-art">+:+    +:+  +:+   +:+      +:+         +:+     +:+        +:+        +:+        +:+    +:+     +:+     +:+    +:+ </span>
        <span className="main__ascii-art">+#++:++#+  +#++:++#++:     +#+         +#+     +#+        +#++:++#   +#++:++#++ +#++:++#++     +#+     +#++:++#+  </span>
        <span className="main__ascii-art">+#+    +#+ +#+     +#+     +#+         +#+     +#+        +#+               +#+ +#+    +#+     +#+     +#+        </span>
        <span className="main__ascii-art">#+#    #+# #+#     #+#     #+#         #+#     #+#        #+#        #+#    #+# #+#    #+#     #+#     #+#        </span>
        <span className="main__ascii-art">#########  ###     ###     ###         ###     ########## ##########  ########  ###    ### ########### ###        </span>
      </div>
      <div className="main__fields-container">
        {restart && (
          <BattleField
            onClick={handleOnClick}
            player="computer"
            field={computerField}
            isActivePlayer={activePlayer.computer}
            isMissed={null}
          />
        )}
        {restart && (
          <BattleField
            onClick={handleOnClick}
            player={props.playerName}
            field={humanField}
            isActivePlayer={activePlayer.human}
            firedCell={computerShot}
            isMissed={null}
          />
        )}
      </div>
      <ModalGameOver
        isOpen={gameOver}
        isWinner={activePlayer.computer ? props.playerName : false}
        onRestart={handleOnRestart}
      />
    </div>
  );
}

export default Main;
