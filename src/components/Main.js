import './Main.css';
import React from 'react';
import Modal from 'react-modal';
import BattleField from './BattleField';
import PopupName from './PopupName';

function Main() {
    const [name, setName] = React.useState('noname')
    const [showModal, setShowModal] = React.useState(true)

// function handleSubmitName(data) {
//     console.log(data)
// }

// function handlePopupClose() {
//     setShowModal(false)
// }

    return (
        <div className="main">
            {/* <Modal
                isOpen={true}
                showModal
            >
                <PopupName 
                onNameSubmit={handleSubmitName} 
                onClose={handlePopupClose}
                />
            </Modal> */}
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
                    player='computer'
                />
                <BattleField
                    player={name}
                />
            </div>

        </div>
    );
}

export default Main;