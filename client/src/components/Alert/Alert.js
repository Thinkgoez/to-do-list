import *as React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { hide } from '../../redux/alertHandler/alertReducer';



const Alert = ({ visible, type, text, hide }) => {
    return (
        <CSSTransition
            in={visible}
            timeout={{
                enter: 500,
                exit: 350
            }}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit
        >
            <div className={`alert alert-${type || 'warning'} alert-dismissible`}>
                <strong>Внимание!</strong>
                {text}
                <button onClick={hide} type='button' className='btn-close' aria-label='Close' />
            </div>
        </CSSTransition>
    );
}
const mapStateToProps = (state) => ({
    visible: state.alert.visible,
    text: state.alert.text,
    type: state.alert.type,
})
export default connect(mapStateToProps, { hide })(Alert)