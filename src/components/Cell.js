import './Cell.css';
import React from 'react';

function Cell(props) {
  // стейт-переменная для заполнения ячейки игрового поля
  const [value, setValue] = React.useState(props.isComputer ? '' : (props.shipId ? '@' : ''));

  function fillTheCell() {
    if (props.shipId) {
      setValue('X');
    } else { setValue('.'); }
  }

  // хук, провоцирующий отрисовку ячейки поля при каждом выстреле компьютера
  // (информация с координатами выстрела спускается из родительского компонента Main)
  React.useEffect(() => {
    if (props.firedCell) {
      fillTheCell();
    }
  }, [props.firedCell]);

  function handleOnClick() {
    fillTheCell();
    props.onClick(props);
  }

  function getClassName() {
    if (!value) {
      return 'cell';
    } if (value !== '.' && value !== '@') {
      return `cell cell_shot ${props.isComputer ? 'cell_inactive' : ''}`;
    }
    return `cell ${props.isComputer ? 'cell_inactive' : 'cell_computer-shot'}`;
  }

  return (
    <div
      className={getClassName()}
      onClick={handleOnClick}
    >
      {value}
    </div>
  );
}

export default Cell;
