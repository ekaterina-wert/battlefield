import React from 'react';
import './Cell.css';

function Cell(props) {

    const [value, setValue] = React.useState('');

    function handleOnClick() {
        props.onClick(props)

        if (props.shipId) { setValue('X'); }
        else { setValue('.'); }
        return 
    }



    return (
        <div
            className={!value ? 'cell' : 'cell cell_inactive'}
            onClick={handleOnClick}
            
        >{value}
        </div>
    )
}

export default Cell;