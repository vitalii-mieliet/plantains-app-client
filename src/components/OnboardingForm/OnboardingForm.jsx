import { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  onboardingSchema,
  MAX_BIO,
} from '../../validation/onboardingValidation';
import styles from './OnboardingForm.module.css';
import AppButton from '../ui/AppButton/AppButton';
import AppTextArea from '../ui/formInputs/AppTextArea/AppTextArea';
import placeholder from '../../assets/images/placeholder/Placeholder.webp';
import { useDispatch, useSelector } from 'react-redux';
import { onboardingUser } from '../../redux/user/operations';
import { useNavigate } from 'react-router-dom';
import { selectUserProfile } from '../../redux/user/selectors';

export default function OnboardingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  // Беремо дані користувача з Redux
  const user = useSelector(selectUserProfile);

  console.log(user);

  // preview потрібен тільки для нового фото
  const [preview, setPreview] = useState(null);

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const onPick = (e, setFieldValue) => {
    const file = e.currentTarget.files?.[0];
    setFieldValue('avatarFile', file || null); // тільки реальні файли
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const removePhoto = (setFieldValue) => {
    setFieldValue('avatarFile', null);
    if (fileRef.current) fileRef.current.value = '';
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('bio', values.bio);
      console.log('Submit', values);
      if (values.avatarFile instanceof File) {
        formData.append('avatar', values.avatarFile);
      }

      const updatedUser = await dispatch(onboardingUser(formData)).unwrap();

      // Скидаємо прев’ю нового фото після сабміту
      setPreview(null);
      resetForm({
        values: {
          bio: updatedUser.bio || '',
          avatarFile: updatedUser.avatar || null,
        },
      });
      navigate(-1);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = { bio: user?.bio || '', avatarFile: user?.avatar };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={onboardingSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>
          {/* Аватар */}
          <div className={styles.row}>
            <label className={styles.label}>Аватар</label>
            <div className={styles.avatarLine}>
              <div className={styles.avatar}>
                <img
                  src={preview || user?.avatar || placeholder}
                  alt="Фото"
                  className={styles.avatar}
                />
              </div>
              <div>
                <input
                  ref={fileRef}
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                  onChange={(e) => onPick(e, setFieldValue)}
                />
                <AppButton
                  type="button"
                  size="sm"
                  variant="grey"
                  onClick={
                    preview
                      ? () => removePhoto(setFieldValue)
                      : () => fileRef.current.click()
                  }
                >
                  {preview ? 'Видалити фото' : 'Завантажити фото'}
                </AppButton>
              </div>
            </div>
          </div>

          {/* Біо */}
          <div className={styles.row}>
            <label htmlFor="bio" className={styles.label}>
              Короткий опис
            </label>
            <Field
              as={AppTextArea}
              id="bio"
              name="bio"
              className={styles.textArea}
              maxLength={MAX_BIO}
              placeholder="Розкажіть більше про вас"
            />
            <p className={styles.counter}>
              Лишилось символів: {MAX_BIO - values.bio.length}
            </p>
            <ErrorMessage name="bio" component="div" className={styles.error} />
          </div>

          {/* Дії */}
          <div className={styles.buttonBox}>
            <AppButton
              type="submit"
              disabled={isSubmitting || (!values.bio && !values.avatarFile)}
            >
              {isSubmitting ? 'Завантаження...' : 'Зберегти'}
            </AppButton>
            <AppButton href="/" variant="grey" type="button">
              Пропустити
            </AppButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
