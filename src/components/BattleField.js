import './BattleField.css';
import React from 'react';
import Cell from './Cell';

function BattleField(props) {
    const field = props.field;

    const [reply, setReply] = React.useState('^(;,;)^');
    const [ships, setShips] = React.useState(field.flat().filter(el => el !== 0));

    // props.firedCell && console.log(props.firedCell)
    // props.firedCell && console.log((field.flat())[props.firedCell])

    function handleOnClick(place) {
        // console.log(field[place.y][place.x])

        if (place.shipId === 0) {
            setReply('not today!');
            props.onClick({ ...props, isMissed: true });
        }
        else {
            ships.splice(ships.indexOf(place.shipId), 1)
            setShips(ships)

            if (ships.indexOf(place.shipId) === -1) {
                setReply('killed!');

                if (ships.length === 0) {
                    props.onClick({ ...props, gameOver: true });
                }
            } else {
                setReply('yet not dead!')
                props.onClick({ ...props, isMissed: false });
            }
        }
    };

    function getClassName() {
        if (props.player === 'computer') {
            if (props.isActivePlayer) return "field__grid" 
            else return "field__grid field__grid_inactive"
        } else {
            if (props.isActivePlayer) return "field__grid field__grid_player_computer" 
            else return "field__grid field__grid_inactive"
        }
    }

    return (
        <div className="field">
            <h2 className='field__player-name'>{props.player.toUpperCase()}</h2>
            <div className={getClassName()}>
                {field.map((row, y) => {
                    return row.map((cell, x) =>
                        <Cell
                            key={`${y}${x}`}
                            // id={`${y}${x}`}
                            x={x}
                            y={y}
                            onClick={handleOnClick}
                            shipId={cell}
                            isComputer={props.player === 'computer'}
                            firedCell={(props.firedCell == `${y}${x}`)}
                        />)
                })
                }
            </div>

            <p className='field__reply'>{reply}</p>
        </div>
    );
};

export default BattleField;