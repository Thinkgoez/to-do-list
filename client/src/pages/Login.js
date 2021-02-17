import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { login } from '../redux/authHandler/authReducer'
import { LoginFormikForm } from '../components/LoginFormikForm/LoginFormikForm'

const Login = ({ login, isAuth, ...props }) => { // error
    const handleSubmit = (formData) => {
        login(formData.email, formData.password)
    }
    return (
        <>
            {isAuth
                ? <Redirect to={'/'} />
                : <div className='auth'>
                    <div className='outer'>
                        <div className='inner'>
                            <LoginFormikForm handleSubmit={handleSubmit} /> {/* submitError={error} /> */}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

Login.propTypes = {
    login: PropTypes.func,
    token: PropTypes.string,
    isAuth: PropTypes.bool
    // error: PropTypes.object
}


const mapStateToProps = (state) => ({
    token: state.auth.token,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)