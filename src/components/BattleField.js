import './BattleField.css';
import React from 'react';
import Cell from './Cell';

function BattleField(props) {
    const [hit, setHit] = React.useState("")

    const field = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 7, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [0, 0, 8, 0, 4, 4, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 5, 0, 0, 0, 9, 0, 0, 0, 10],
        [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 3, 3, 0, 6, 6],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 11, 0, 0, 0, 0, 0, 0, 0],
    ];

    function handleOnClick(place) {
        // console.log(field[place.y][place.x])
        // console.log(place.shipId)

        if (place.shipId === 0) {
            console.log('not today!');
            return;
        }
        else {
            field[place.y].splice([place.x], 1, 0);
            if (field.some((row) => {
                return row.some(cell => {
                    return cell === place.shipId
                })
            })) { console.log('yet not dead!') }
            else {
                console.log('killed!');
                if (field.some((row) => {
                    return row.some(cell => {
                        return cell !== 0;
                    })
                })) {
                    return;
                } else {
                    console.log('Game over')
                }
            }
        }
    };

    return (
        <div className="field">
            <h2 className='field__player-name' >{props.player.toUpperCase()}</h2>
            <div className="field__grid">
                {field.map((row, y) => {
                    return row.map((cell, x) =>
                        <Cell
                            key={`${y}${x}`}
                            id={`${y}${x}`}
                            x={x}
                            y={y}
                            onClick={handleOnClick}
                            shipId={cell}
                        />)
                })
                }
            </div>
        </div>
    );
};

export default BattleField;