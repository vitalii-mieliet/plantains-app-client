import * as Yup from 'yup';

export const validationAddStorySchema = Yup.object({
  title: Yup.string()
    .required('Заголовок обовʼязковий')
    .max(100, 'Максимум 100 символів'),
  category: Yup.string().required('Виберіть категорію'),
  article: Yup.string()
    .required('Опис обовʼязковий')
    .max(150, 'Максимум 150 символів'),
  fullText: Yup.string()
    .required('Текст історії обовʼязковий')
    .min(10, 'Мінімум 10 символів'),
});
