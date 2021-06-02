import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { login } from '../actions/actionCreator'
import { AuthLoginForm } from '../components/AuthLoginForm/AuthLoginForm'
import { Loader } from '../components/Loader/Loader';

const Login = ({ login, isAuth, loading, ...props }) => { // error
    const handleSubmit = (formData) => {
        login(formData.email, formData.password)
    }
    return (
        <>
            {loading
                ? <Loader />
                : isAuth
                    ? <Redirect to={'/'} />
                    :
                    <div className='auth'>
                        <div className='outer'>
                            <div className='inner'>
                                <AuthLoginForm handleSubmit={handleSubmit} />
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

Login.propTypes = {
    login: PropTypes.func,
    isAuth: PropTypes.bool,
    loading: PropTypes.bool, // should ne fixed
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    generalError: state.auth.error,
    loading: state.option.loading
})

export default connect(mapStateToProps, { login })(Login)