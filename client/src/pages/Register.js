import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { createUser } from '../actions/actionCreator'
import {AuthRegisterForm} from '../components/AuthRegisterForm/AuthRegisterForm'

const Register = ({ createUser, token, ...props }) => { // error
    const handleSubmit = (formData) => {
        createUser(formData)
    }
    return (
        <>
            { token
                ? <Redirect to={'/'} />
                : <div className='auth'>
                    <div className='outer'>
                        <div className='inner'>
                            <AuthRegisterForm handleSubmit={handleSubmit} /> {/*submitError={error} /> */}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}




Register.propTypes = {
    // error: PropTypes.string,
    token: PropTypes.string,
    createUser: PropTypes.func,
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})
export default connect(mapStateToProps, { createUser })(Register)
