import React from 'react';

function PopupName(props) {
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
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <h2 className="popup__title">Enter your name</h2>
                <form
                    onSubmit={handleSubmit}
                    className='popup__form'
                    noValidate
                >
                    <fieldset className="popup__input-container">
                        <input
                            type="text"
                            className="popup__text"
                            value={name}
                            minLength="2"
                            maxLength="30"
                            onChange={handleChangeName}
                            required
                        />
                    </fieldset>
                    <button className="popup__submit" type="submit">Ok</button>
                </form>
            </div>
            <button className="popup__close-button" type="button" aria-label="Close" onClick={props.onClose} />
        </div>
    )
}

export default PopupName;