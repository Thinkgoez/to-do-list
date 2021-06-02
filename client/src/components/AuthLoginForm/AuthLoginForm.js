import { Formik } from 'formik';
import PropTypes from 'prop-types'
import *as Yup from 'yup'

import { FormGroup, FormLabel } from '../common/FormStyledComponents';
import { AuthButton, AuthError, AuthLink, AuthInput} from '../common/AuthStyledComponents'

let loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
});


export const AuthLoginForm = ({ handleSubmit, ...props }) => { //submitError,
    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
                await handleSubmit(values)
                setSubmitting(false)
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
                    <h3>Log In</h3>
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
                        {/* {errors.email && touched.email && <Error>{errors.email}</Error>} */}
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
                    <AuthButton
                        disabled={isSubmitting}
                        type='submit'
                    >Sign in</AuthButton>
                    <AuthLink to='/register'>Register</AuthLink>
                </form>
            )}
        </Formik>
    )
}

AuthLoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}