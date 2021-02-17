import { Formik } from "formik"
import PropTypes from 'prop-types'

export const ProjectCreateForm = ({ submitForm, ...props }) => {

    const validator = (values) => {
        const errors = {};
        if (!values.title.trim()) {
            errors.title = "Shouldn't be empty";
        }
        if (!values.description.trim()) {
            errors.description = "Shouldn't be empty";
        }
        return errors;
    }
    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        // submitForm(values)
        resetForm({ values: { title: '', description: '' } })
    }

    return (
        <Formik
            initialValues={{ title: '', description: '' }}
            initialErrors={{ title: '', description: '' }}
            validate={validator}
            validateOnBlur={false}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setErrors,
                ...props
            }) => (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            {errors.title}
                            <input
                                type='text'
                                name='title'
                                className='form-control'
                                placeholder='Введите название нового проекта'
                                value={values.title}
                                onChange={handleChange}
                                onBlur={(e) => {
                                    setErrors(errors.title = '')
                                    handleBlur(e)
                                }}
                            />
                            <input
                                type='text'
                                name='description'
                                className='form-control'
                                placeholder='Введите описание проекта'
                                value={values.description}
                                onChange={handleChange}
                                onBlur={(e) => {
                                    setErrors(errors.description = '')
                                    handleBlur(e)
                                }}
                            />
                            <button className={'btn'} type='submit'>Submit e-ho-ho-ho</button>
                        </div>
                    </form>
                </>
            )}
        </Formik>
    )
}

ProjectCreateForm.propTypes = {
    submitForm: PropTypes.func.isRequired
}