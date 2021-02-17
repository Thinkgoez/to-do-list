import { Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { createUser } from '../redux/authHandler/authReducer'

const Register = ({ createUser, token, ...props }) => { // error
    const handleSubmit = (formData) => {
        // console.log(formData)
        createUser(formData)
    }
    return (
        <>
            { token
                ? <Redirect to={'/'} />
                : <div className='auth'>
                    <div className='outer'>
                        <div className='inner'>
                            <SignUpFormikForm handleSubmit={handleSubmit} /> {/*submitError={error} /> */}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}


const SignUpFormikForm = ({ handleSubmit, ...props }) => { //submitError
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Required';
                }

                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                ...props
            }) => (
                <form onSubmit={handleSubmit}>
                    <h3>Register</h3>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className='form-control'
                            placeholder='Enter email'
                        />
                    </div>

                    {errors.email && touched.email && errors.email}
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className='form-control'
                            placeholder='Enter password'
                        />
                    </div>

                    {errors.password && touched.password && errors.password}
                    {/* {submitError} */}
                    <button type='submit' className='btn btn-dark btn-lg btn-block' disabled={isSubmitting}>Register</button>
                    <p className='forgot-password text-right'>
                        <NavLink className='nav-link' to='/login'>Log in</NavLink>
                    </p>
                </form>
            )}
        </Formik>
    )
}

Register.propTypes = {
    // error: PropTypes.string,
    token: PropTypes.string,
    createUser: PropTypes.func,
}

SignUpFormikForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    token: state.auth.token
})
export default connect(mapStateToProps, { createUser })(Register)
