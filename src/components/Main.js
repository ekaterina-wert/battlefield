import './Main.css';
import React from 'react';
import BattleField from './BattleField';
import ModalGameOver from './ModalGameOver';
import { renderField } from '../utils/fields';

function Main(props) {
    let ComputerField = renderField();
    let HumanField = renderField();

    const [activePlayer, setActivePlayer] = React.useState({
        computer: true,
        human: false
    });

    const [gameOver, setGameOver] = React.useState(false)

    function handleOnClick(data) {
        data.isMissed && setActivePlayer({
            computer: !activePlayer.computer,
            human: !activePlayer.human
        })
        data.gameOver && setGameOver(data.gameOver);
    }

    function handleOnRestart() {
        setGameOver(false);
        ComputerField = renderField();
        HumanField = renderField();
    }

    return (
        <div className="main">
            <div className='main__title-container'>
                <span className='main__ascii-art'>:::::::::      :::     ::::::::::: ::::::::::: :::        ::::::::::  ::::::::  :::    ::: ::::::::::: :::::::::  </span>
                <span className='main__ascii-art'>:+:    :+:   :+: :+:       :+:         :+:     :+:        :+:        :+:    :+: :+:    :+:     :+:     :+:    :+: </span>
                <span className='main__ascii-art'>+:+    +:+  +:+   +:+      +:+         +:+     +:+        +:+        +:+        +:+    +:+     +:+     +:+    +:+ </span>
                <span className='main__ascii-art'>+#++:++#+  +#++:++#++:     +#+         +#+     +#+        +#++:++#   +#++:++#++ +#++:++#++     +#+     +#++:++#+  </span>
                <span className='main__ascii-art'>+#+    +#+ +#+     +#+     +#+         +#+     +#+        +#+               +#+ +#+    +#+     +#+     +#+        </span>
                <span className='main__ascii-art'>#+#    #+# #+#     #+#     #+#         #+#     #+#        #+#        #+#    #+# #+#    #+#     #+#     #+#        </span>
                <span className='main__ascii-art'>#########  ###     ###     ###         ###     ########## ##########  ########  ###    ### ########### ###        </span>
            </div>
            <div className='main__fields-container'>
                <BattleField
                    onClick={handleOnClick}
                    player='computer'
                    field={ComputerField}
                    isActivePlayer={activePlayer.computer}
                />
                <BattleField
                    onClick={handleOnClick}
                    player={props.playerName}
                    field={HumanField}
                    isActivePlayer={activePlayer.human}
                />
            </div>
            <ModalGameOver
                isOpen={gameOver}
                isWinner={activePlayer.computer ? props.playerName : 'computer'}
                onRestart={handleOnRestart}
            />


        </div>
    );
}

export default Main;