import { Formik } from 'formik';
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup'

import { FormGroup, FormLabel } from '../common/FormStyledComponents';
import { AuthButton, AuthError, AuthLink, AuthInput} from '../common/AuthStyledComponents'

let registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    username: Yup.string().required('Required')
});

export const AuthRegisterForm = ({ handleSubmit, ...props }) => { //submitError,
    return (
        <Formik
            initialValues={{ email: '', password: '', username: '' }}
            validationSchema={registerSchema}
            onSubmit={async (values, { setSubmitting }) => {
                const res = await handleSubmit(values)
                setSubmitting(false)
                // console.log(res)
            }}
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
                <form onSubmit={handleSubmit} style={{ color: '#000' }}>
                    <h3>Sign Up</h3>
                    <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <AuthInput
                            type='text'
                            name='username'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            placeholder='Your name'
                            autoComplete='off'
                            className={!!errors.username && touched.username ? 'invalid' : ''}
                            isInvalid={!!errors.username && touched.username}
                            autoComplete='off'
                        />
                        <AuthError>{errors.username && touched.username && errors.username}</AuthError>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <AuthInput
                            type='email'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            autoComplete='off'
                            placeholder='Enter email'
                            className={!!errors.email && touched.email ? 'invalid' : ''}
                            isInvalid={!!errors.email && touched.email}
                        />
                        <AuthError>{errors.email && touched.email && errors.email}</AuthError>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <AuthInput
                            type='password'
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Enter password'
                            isInvalid={!!errors.password && touched.password}
                            className={!!errors.password && touched.password ? 'invalid' : ''}
                        />
                        <AuthError>{errors.password && touched.password && errors.password}</AuthError>
                    </FormGroup>
                    <AuthLink to='/login'>Log in</AuthLink>
                    <AuthButton
                        disabled={isSubmitting}
                        type='submit'
                    >Register</AuthButton>
                </form>
            )}
        </Formik>
    )
}

AuthRegisterForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}