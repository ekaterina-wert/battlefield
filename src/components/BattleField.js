import './BattleField.css';
import React from 'react';
import Cell from './Cell';

function BattleField(props) {
    const field = props.field;
    
    const [reply, setReply] = React.useState('^(;,;)^');
    
    // const field = [
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [1, 1, 1, 1, 0, 7, 0, 0, 0, 2],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    //     [0, 0, 8, 0, 4, 4, 0, 0, 0, 2],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 5, 0, 0, 0, 9, 0, 0, 0, 10],
    //     [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 3, 3, 3, 0, 6, 6],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // ];

    const [ships, setShips] = React.useState(field.flat().filter(el => el !== 0));
    // let helper = field.flat().filter(el => el !== 0)
    // console.log(helper)


    function handleOnClick(place) {
        // debugger;
        // console.log(field[place.y][place.x])
        console.log(ships)

        // console.log(killedShips)
        if (place.shipId === 0) {
            setReply('not today!');
            props.onClick({ ...props, isMissed: true });
        }
        else {
            // props.onClick({ ...props, isMissed: false });
            ships.splice(ships.indexOf(place.shipId), 1)
            setShips(ships)
            console.log(ships)

            if (ships.indexOf(place.shipId) === -1) {
                setReply('killed!');

                if (ships.length === 0) { 
                    props.onClick({ ...props, gameOver: true }); 
                }
                
            } else {
                console.log(ships)
                setReply('yet not dead!')
                props.onClick({ ...props, isMissed: false });
            }

        }

    };

    return (
        <div className="field">
            <h2 className='field__player-name'>{props.player.toUpperCase()}</h2>
            <div className={props.isActivePlayer ? "field__grid" : "field__grid field__grid_inactive"}>
                {field.map((row, y) => {
                    return row.map((cell, x) =>
                        <Cell
                            key={`${y}${x}`}
                            id={`${y}${x}`}
                            x={x}
                            y={y}
                            onClick={handleOnClick}
                            shipId={cell}
                            isComputer={props.player === 'computer'}
                        />)
                })
                }
            </div>
            <p className='field__reply'>{reply}</p>
        </div>
    );
};

export default BattleField;