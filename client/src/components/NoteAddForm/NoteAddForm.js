import PropTypes from "prop-types";
import { Formik } from "formik";
import { IoSend } from "react-icons/io5";
import { Error, FormControl, FormGroup, SendButton } from "../common/FormStyledComponents";

export const NoteAddForm = ({ handleSubmit, ...props }) => {
    return (
        <Formik
            initialValues={{ formValue: "" }}
            validate={(values) => {
                const errors = {};
                if (!values.formValue.trim()) {
                    errors.formValue = "Shouldn't be empty";
                }
                return errors;
            }}
            validateOnBlur={false}
            onSubmit={(values, { resetForm }) => {
                handleSubmit(values);
                resetForm({ values: { formValue: "" } });
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setErrors,
                ...props
            }) => (
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            name="formValue"
                            placeholder="Введите название разметки"
                            value={values.formValue}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={(e) => {
                                setErrors({ formValue: "" });
                                handleBlur(e);
                            }}
                            // isInvalid={!!errors.formValue}
                        />
                        {errors.formValue && <Error>{errors.formValue}</Error>}
                        {values.formValue && <SendButton type='submit'>
                            <IoSend />
                        </SendButton>}
                    </FormGroup>
                </form>
            )}
        </Formik>
    );
};

NoteAddForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};
