import css from './AuthForm.module.css';
import { Formik, Form, useField } from 'formik';
import AppTextInput from '../ui/formInputs/AppTextInput/AppTextInput.jsx';
import AppButton from '../ui/AppButton/AppButton.jsx';
import useBreakpoint from '../../hooks/useBreakpoint.js';
import { useSelector } from 'react-redux';
import { selectAuthIsLoading } from '../../redux/auth/selectors.js';

const FormikTextInput = ({ name, type, placeholder, autoComplete }) => {
  const [field, meta] = useField(name);
  return (
    <AppTextInput
      {...field}
      id={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      error={meta.touched && !!meta.error}
      errorMessage={meta.touched ? meta.error : ''}
      aria-invalid={meta.touched && !!meta.error}
      aria-describedby={`${name}-error`}
    />
  );
};

const AuthForm = ({
  fields,
  initialValues,
  validationSchema,
  submitText,
  onSubmitAction,
}) => {
  const { isMobile } = useBreakpoint();
  const isLoading = useSelector(selectAuthIsLoading);

  const handleSubmit = async (values, actions) => {
    try {
      const cleanValues = Object.fromEntries(
        Object.entries(values).map(([key, val]) => [
          key,
          typeof val === 'string' ? val.trim() : val,
        ])
      );
      await onSubmitAction(cleanValues, actions);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.fieldsWrapper}>
            {fields.map(
              ({ name, type, placeholder, label, required, autoComplete }) => (
                <div key={name} className={css.fieldGroup}>
                  <label
                    htmlFor={name}
                    className={`${css.label} ${required ? css.labelRequired : ''}`}
                  >
                    {label}
                    {required && '*'}
                  </label>
                  <FormikTextInput
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                  />
                </div>
              )
            )}
            <AppButton
              size={isMobile ? 'sm' : 'md'}
              fullWidth
              variant="blue"
              type="submit"
              disabled={isLoading}
            >
              {submitText}
            </AppButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
