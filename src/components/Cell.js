import React from 'react';
import './Cell.css';

function Cell(props) {

    const [value, setValue] = React.useState(props.isComputer ? '' : (props.shipId ? '@' : ''));

    function handleOnClick() {
  

        if (props.shipId) { setValue('X'); }
        else { setValue('.'); }
        props.onClick(props)
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