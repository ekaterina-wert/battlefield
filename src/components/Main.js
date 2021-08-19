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

    const [computerShot, setComputerShot] = React.useState(null);

    const [gameOver, setGameOver] = React.useState(false);
    const [winner, setWinner] = React.useState('')

    function getArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array[i] = i;
        }

        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const [shotsArray, setShotsArray] = React.useState(getArray());


    function getUniqueShot() {
        console.log(shotsArray)
        return shotsArray.pop()
    }


    function computerMove() {
        setComputerShot(getUniqueShot());
        console.log(shotsArray)
        setTimeout(() => {
            setActivePlayer({
                computer: true,
                human: false
            });
        }, 2000)

        console.log(computerShot);
    }

    function computerSimpleLogic() {
        if (computerShot % 10 < 9 && shotsArray.includes(computerShot + 1)) {
            setTimeout(() => setComputerShot(computerShot + 1), 1000);
            let newArr = shotsArray.splice(shotsArray.indexOf(computerShot + 1), 1)
            setShotsArray(shotsArray)
            console.log(shotsArray)
        } else if (computerShot % 10 !== 0 && shotsArray.includes(computerShot - 1)) {
            setTimeout(() => setComputerShot(computerShot - 1), 1000);
            let newArr = shotsArray.splice(shotsArray.indexOf(computerShot - 1), 1)
            setShotsArray(shotsArray)
            console.log(shotsArray)
        } else if (computerShot / 10 > 1 && shotsArray.includes(computerShot - 10)) {
            setTimeout(() => setComputerShot(computerShot - 10), 1000);
            let newArr = shotsArray.splice(shotsArray.indexOf(computerShot - 10), 1)
            setShotsArray(shotsArray)
            console.log(shotsArray)
        } else if (computerShot / 10 < 9 && shotsArray.includes(computerShot + 10)) {
            setTimeout(() => setComputerShot(computerShot + 10), 1000);
            let newArr = shotsArray.splice(shotsArray.indexOf(computerShot + 10), 1)
            setShotsArray(shotsArray)
            console.log(shotsArray)
        }
        else setTimeout(computerMove, 800);
    }

    function handleOnClick(data) {
        if (data.hurt) {
            computerSimpleLogic()
        } else {
            data.isMissed && setActivePlayer({
                computer: !activePlayer.computer,
                human: !activePlayer.human
            });
            data.isMissed && setTimeout(computerMove, 800);
            if (data.gameOver) {
                console.log(data.winner)
                setGameOver(data.gameOver);
                setWinner(data.winner);
                console.log(winner)
            }
        }
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
                    isMissed={null}
                />
                <BattleField
                    onClick={handleOnClick}
                    player={props.playerName}
                    field={HumanField}
                    isActivePlayer={activePlayer.human}
                    firedCell={computerShot}
                    isMissed={null}
                />
            </div>
            <ModalGameOver
                isOpen={gameOver}
                isWinner={winner}
                onRestart={handleOnRestart}
                playerName={props.playerName}
            />


        </div>
    );
}

export default Main;