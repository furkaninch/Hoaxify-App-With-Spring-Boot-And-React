import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';

const Modal = (props) => {
    const {visible,onClickCancel,onClickSubmit,message,pendingApiCall , title} = props;
    let className = "modal fade";

    if(visible){
        className += "show d-block";
    }

    const {t} = useTranslation();
    return (
        <div className= {className} style = {{backgroundColor: '#000000b0'}} >
            <div className="modal-dialog" >
                <div className="modal-content">
                 <div className="modal-header">
            <h5 className="modal-title m-auto">{title}</h5>
            </div>
      <div className="modal-body">
            {message}
      </div>
      <div className="modal-footer">
        <button disabled={pendingApiCall} type="button" onClick={onClickCancel} className="btn btn-secondary" >{t('Cancel')}</button>
        <Button onClick={onClickSubmit} className="btn btn-danger" text = {t('Delete')} disabled={pendingApiCall} spinner={pendingApiCall}/>
      </div>
    </div>
  </div>
</div>
    );
};

export default Modal;