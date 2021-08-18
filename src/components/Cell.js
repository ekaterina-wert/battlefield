import React from 'react';
import './Cell.css';

function Cell(props) {

    const [value, setValue] = React.useState(props.isComputer ? '' : (props.shipId ? '@' : ''));

    React.useEffect(() => {
        if (props.firedCell) {
            fillTheCell();
        }
    }, [props.firedCell])

    function fillTheCell(comp) {
        if (props.shipId) {
            setValue('X');

        }
        else { setValue('.'); }
    }

    function handleOnClick() {
        if (props.shipId) {
            setValue('X');
        }
        else { setValue('.'); }
        props.onClick(props)
    }

    function getClassName() {
        if (!value) {
            return 'cell'
        } else {

            if (value !== '.' && value !== '@') {
                return `cell cell_shot ${props.isComputer ? 'cell_inactive' : ''}`
            } else {
                return `cell ${props.isComputer ? 'cell_inactive' : 'cell_computer-shot'}`
            }

        }
    }

    return (
        <div
            className={getClassName()}
            onClick={handleOnClick}
        >{value}
        </div>
    )
}

export default Cell;