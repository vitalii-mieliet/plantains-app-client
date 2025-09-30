import { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useNavigate } from 'react-router-dom';

import Container from '../common/Container/Container';
import Section from '../common/Section/Section';
import AppButton from '../ui/AppButton/AppButton';
import placeholder from '../../assets/images/placeholder/Placeholder.webp';

import AppTextArea from '../ui/formInputs/AppTextArea/AppTextArea';
import AppTextInput from '../ui/formInputs/AppTextInput/AppTextInput';
import AppSelect from '../ui/formInputs/AppSelect/AppSelect';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createStory } from '../../redux/stories/operations';
import {
  selectCategories,
  selectIsLoading,
} from '../../redux/stories/selectors';
import style from './AddStoryForm.module.css';
import {
  showErrorToast,
  showSuccessToast,
} from '../common/AppToastContainer/toastHelpers';
import { validationAddStorySchema } from '../../validation/createStoryValidation';
import Loader from '../common/Loader/Loader';

const AddStoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);

  const formattedCategories = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const maxLength = 150;

  const initialValues = {
    title: '',
    category: '',
    article: '',
    fullText: '',
    img: null,
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue('img', file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await dispatch(createStory(values)).unwrap();

      resetForm();
      setPreview(null);
      showSuccessToast('Форма відправлена успішно!');

      navigate(-1);
    } catch (error) {
      console.log(error);
      showErrorToast('Помилка при створенні історії. Спробуйте ще раз!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = (resetForm) => {
    resetForm();
    setPreview(null);
    navigate(-1);
  };

  const removePhoto = (setFieldValue) => {
    setFieldValue('avatarFile', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (preview) URL.revokeObjectURL(preview);
    setPreview('');
  };

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        <div className={style.box}>
          <h1 className={style.tittle}>Створити нову історію</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationAddStorySchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isValid, dirty, resetForm }) => (
              <Form className={style.formBox}>
                <div className={style.formBoxDesktop}>
                  {/* Завантаження фото */}
                  <div>
                    <label className={style.label} htmlFor="upload-photo">
                      Обкладинка статті
                    </label>
                    <div>
                      <img
                        src={preview || placeholder}
                        alt="Preview"
                        className={style.photo}
                        width={865}
                        height={576}
                      />
                    </div>
                    <input
                      ref={fileInputRef}
                      id="upload-photo"
                      type="file"
                      accept="image/*"
                      aria-label="Завантажити фото для обкладинки статті"
                      className={style.uploadInput}
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    />
                    <AppButton
                      type="button"
                      variant="grey"
                      size="sm"
                      onClick={
                        preview
                          ? () => removePhoto(setFieldValue)
                          : () => fileInputRef.current.click()
                      }
                    >
                      {preview ? 'Видалити фото' : 'Завантажити фото'}
                    </AppButton>
                  </div>

                  {/* Заголовок */}
                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="title">
                      Заголовок
                    </label>
                    <Field
                      as={AppTextInput}
                      id="title"
                      name="title"
                      placeholder="Введіть заголовок історії"
                      aria-label="Заголовок статті"
                    />
                  </div>

                  {/* Категорія */}
                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="category">
                      Категорія
                    </label>
                    <AppSelect
                      name="category"
                      options={formattedCategories}
                      placeholder="Категорія"
                      ariaLabel="Категорія статті"
                    />
                  </div>

                  {/* Короткий опис */}
                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="article">
                      Короткий опис
                    </label>
                    <Field
                      as={AppTextArea}
                      id="article"
                      name="article"
                      maxLength={maxLength}
                      placeholder="Введіть короткий опис історії"
                      aria-label="Короткий опис статті"
                      className={style.textArea}
                    />
                    <p className={style.symbol}>
                      Лишилось символів: {maxLength - values.article.length}
                    </p>
                  </div>

                  {/* Повний текст історії */}
                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="fullText">
                      Текст історії
                    </label>
                    <Field
                      as={AppTextArea}
                      id="fullText"
                      name="fullText"
                      placeholder="Ваша історія тут"
                      aria-label="Повний текст статті"
                    />
                  </div>
                </div>

                {/* Кнопки */}
                <div className={style.appButtonBox}>
                  <AppButton
                    type="submit"
                    disabled={!dirty || !isValid}
                    aria-label="Зберегти історію"
                  >
                    Зберегти
                  </AppButton>
                  <AppButton
                    type="button"
                    variant="grey"
                    aria-label="Відмінити створення історії"
                    onClick={() => handleResetForm(resetForm)}
                  >
                    Відмінити
                  </AppButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Section>
  );
};

export default AddStoryForm;
