import './BattleField.css';
import React from 'react';
import Cell from './Cell';

function BattleField(props) {
  const { field } = props;

  // стейт-переменная для вывода результата выстрела на экран
  const [reply, setReply] = React.useState('^(;,;)^');

  // получение массива с id кораблей для ослеживания состояний убит/ранен
  const [ships, setShips] = React.useState(field && field.flat().filter((el) => el !== 0));

  // функция-обработчик результатов выстрела компьютера:
  // при попадании по кораблю или его части, из массива ships убирается его значение 
  // и предоставляется возможность дополнительного хода
  function renderComputerMoveReply(place) {
    const shot = field.flat()[place];
    if (shot === 0) {
      setReply('not today!');
      props.onClick({ ...props, isMissed: false });
    } else {
      ships.splice(ships.indexOf(shot), 1);
      setShips(ships);

      if (ships.indexOf(shot) !== -1) {
        setReply('yet not dead!');
        props.onClick({ ...props, hurt: true });
      } else {
        setReply('killed!');

        if (ships.length === 0) {
          props.onClick({ ...props, gameOver: true });
        }
        props.onClick({ ...props, isMissed: true });
      }
    }
  }

  // хук, провоцирующий отрисовку ответа компьютера при каждом его выстреле
  // (информация с координатами выстрела спускается из родительского компонента Main)
  React.useEffect(() => {
    if (props.firedCell) {
      renderComputerMoveReply(props.firedCell);
    }
  }, [props.firedCell]);

  // функция-дублер обработчика результатов выстрела компьютера, адаптированная под человека:
  // при попадании по кораблю или его части, из массива ships убирается его значение 
  // и предоставляется возможность дополнительного хода
  function renderReply(place) {
    if (place.shipId === 0) {
      setReply('not today!');
      props.onClick({ ...props, isMissed: true });
    } else {
      ships.splice(ships.indexOf(place.shipId), 1);
      setShips(ships);
      if (ships.indexOf(place.shipId) !== -1) {
        setReply('yet not dead!');
        props.onClick({ ...props, isMissed: false });
      } else {
        setReply('killed!');

        if (ships.length === 0) {
          props.onClick({ ...props, gameOver: true });
        }
        props.onClick({ ...props, isMissed: false });
      }
    }
  }

  function handleOnClick(place) {
    renderReply(place);
  }

  function getClassName() {
    if (props.player === 'computer') {
      if (props.isActivePlayer) return 'field__grid';
      return 'field__grid field__grid_inactive';
    } if (props.isActivePlayer) return 'field__grid field__grid_player_computer';
    return 'field__grid field__grid_inactive';
  }

  return (
    <div className="field">
      <h2 className="field__player-name">{props.player.toUpperCase()}</h2>
      <div className={getClassName()}>
        {field.map((row, y) => row.map((cell, x) => (
          <Cell
            key={`${y}${x}`}
            x={x}
            y={y}
            onClick={handleOnClick}
            shipId={cell}
            isComputer={props.player === 'computer'}
            firedCell={(props.firedCell == `${y}${x}`)}
          />
        )))}
      </div>
      <p className="field__reply">{reply}</p>
    </div>
  );
}

export default BattleField;
