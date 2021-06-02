import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

import { createUser } from '../actions/actionCreator'
import { AuthRegisterForm } from '../components/AuthRegisterForm/AuthRegisterForm'
import { Loader } from '../components/Loader/Loader';

const Register = ({ createUser, isAuth, loading, ...props }) => { // error
    const handleSubmit = (formData) => {
        createUser(formData)
    }
    return (
        <>
            {loading
                ? <Loader />
                : isAuth
                    ? <Redirect to={'/'} />
                    : <div className='auth'>
                        <div className='outer'>
                            <div className='inner'>
                                <AuthRegisterForm handleSubmit={handleSubmit} />
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}




Register.propTypes = {
    // error: PropTypes.string,
    isAuth: PropTypes.bool,
    createUser: PropTypes.func,
    loading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    loading: state.option.loading
})
export default connect(mapStateToProps, { createUser })(Register)
