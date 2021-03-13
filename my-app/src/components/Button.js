import React from 'react';

const Button = (props) => {
    const{disabled,onClick,spinner,text , className} = props;
    return (
        
                <button disabled={disabled} className={className || "btn btn-primary"} onClick={onClick}>
                {text} {spinner && <span className="spinner-border spinner-border-sm"></span>}
                    </button>
          
    );
};

export default Button;