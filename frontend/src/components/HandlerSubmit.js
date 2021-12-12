import React from 'react';

function HandlerSubmit(props) {

    return (
        <button
            type="submit"
            className={`modal__submit-button`}
        >
            {props.onClick ? "Сохранение..." : props.button}
        </button>
    )
}

export default HandlerSubmit;