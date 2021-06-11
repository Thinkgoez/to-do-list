// import { useEffect } from 'react'
import { Formik } from 'formik';
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { BackButton } from '../common/BackButton';
import { FormLabel, FormControl, TextArea, Error, BtnSecondary, BtnPrimary } from '../common/FormStyledComponents';


const SettingsButtons = styled.div`
    display: flex;
    justify-content: space-between;
    aling-items: center;
`

export const ProjectSettingsForm = ({ handleSubmit, project: { title, description }, ...props }) => {
    return (
        <Formik
            initialValues={{ title: '', description }}
            validate={values => {
                const errors = {};
                if (values.title === title) {
                    errors.title = 'New title cannot be the same as the old value';
                }
                return errors;
            }}
            onSubmit={(values) => {
                const newValues = {
                    title: values.title.trim() ? values.title : title,
                    description: values.description.trim() ? values.description : description
                }
                handleSubmit(newValues)
            }}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
            ...props
        }) => {
            return (
                <form onSubmit={handleSubmit}>
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <FormLabel>Title</FormLabel>
                        <FormControl
                            type='text'
                            name='title'
                            className={!!errors.title ? 'invalid' : ''}
                            placeholder='Введите новое название проекта'
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.title}
                            autoComplete='off'
                        />
                        {errors.title && <Error>{errors.title}</Error>}
                    </div>

                    <div>
                        <FormLabel>Description</FormLabel>
                        <TextArea
                            name='description'
                            placeholder='Введите описание проекта'
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.description}
                        />
                    </div>

                    <SettingsButtons>
                        <BackButton type='button' />
                        <div>
                            <BtnSecondary type='button' onClick={resetForm} className='btn'>Reset</BtnSecondary>
                            <BtnPrimary className='btn' type='submit'>Save</BtnPrimary>
                        </div>
                    </SettingsButtons>
                </form>
            )
        }
            }
        </Formik>
    )
}

ProjectSettingsForm.propTypes = {
    title: PropTypes.string,
    handleSubmit: PropTypes.func
}