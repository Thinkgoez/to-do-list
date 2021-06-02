import *as React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { hide } from '../../actions/actionCreator';
import s from './Alert.module.css'

const Alert = ({ visible, type ='', text, hide }) => {
    return (
        <>
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
                <div className={s.alert + (s[type] ? ' '+  s[type] : '')} >
                    <strong>Внимание!</strong>
                    {text}
                    <button onClick={hide} type='button' className={s.btnClose} aria-label='Close' />
                </div>
            </CSSTransition>
        </>
    );
}
// `alert alert-${type || 'warning'} alert-dismissible`

const mapStateToProps = (state) => ({
    visible: state.alert.visible,
    text: state.alert.text,
    type: state.alert.type,
})
export default connect(mapStateToProps, { hide })(Alert)