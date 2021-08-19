import React from 'react';
import './Modals.css';

function ModalGameOver(props) {
    return (
        <div className={`modal ${props.isOpen && 'modal_opened'}`}>
            <div className="modal__container">
                <h2 className="modal__final-title">game over!</h2>
                <p className="modal__final-text">{props.isWinner ?  `${props.isWinner}, you win!` : 'You lose :-['}</p>
                <button className="modal__restart-button" type="button" aria-label="Restart" onClick={props.onRestart}>Play again</button>
            </div>
        </div>
    )
}

export default ModalGameOver;