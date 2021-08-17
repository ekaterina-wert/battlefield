import React from 'react';
import './ModalForName.css';

function ModalForName(props) {
    const [name, setName] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onNameSubmit(name);

    }

    return (
        <div className={`modal ${props.isOpen && 'modal_opened'}`}>
            <div className="modal__container">
                <button className="modal__close-button" type="button" aria-label="Close" onClick={props.onClose}>X</button>
                <h2 className="modal__title">Enter your name</h2>
                <form
                    onSubmit={handleSubmit}
                    className='modal__form'
                    noValidate
                >
                    <fieldset className="modal__input-container">
                        <input
                            type="text"
                            className="modal__text"
                            value={name}
                            onChange={handleChangeName}
                            autoFocus
                            required
                        />
                    </fieldset>
                    <button className="modal__submit" type="submit">Ok</button>
                </form>
            </div>

        </div>
    )
}

export default ModalForName;