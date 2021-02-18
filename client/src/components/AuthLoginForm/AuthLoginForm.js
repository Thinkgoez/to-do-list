import { Formik } from 'formik';
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { NavLink } from 'react-router-dom';
import *as Yup from 'yup'

let loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
});


export const AuthLoginForm = ({ handleSubmit, ...props }) => { //submitError,
    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={async (values, {setSubmitting}) => {
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
                <Form noValidate onSubmit={handleSubmit}>
                    <h3>Log In</h3>
                    <Form.Group controlId='formBasicEmail' className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Enter email'
                            isInvalid={!!errors.email && touched.email}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.email && touched.email && errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword' className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Enter password'
                            isInvalid={!!errors.password && touched.password}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {errors.password && touched.password && errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {/* {submitError} */}
                    <Form.Group controlId='formBasicCheckbox' className='my-2'>
                        <Form.Check
                            type='checkbox'
                            name='rememberMe'
                            label='Remember me'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button
                        disabled={isSubmitting}
                        variant='dark' type='submit'
                    >Sign in</Button>
                    <NavLink className='nav-link float-end' to='/register'>Register</NavLink>
                </Form>
            )}
        </Formik>
    )
}

AuthLoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}