import * as Yup from 'yup';

export const MAX_BIO = 150;
const MAX_FILE_MB = 5;
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const onboardingSchema = Yup.object({
  bio: Yup.string().trim().max(MAX_BIO, `Не більше ${MAX_BIO} символів`),
  avatarFile: Yup.mixed()
    .notRequired()
    .test('size', `Фото має бути ≤ ${MAX_FILE_MB}MB`, (f) => {
      if (!f || typeof f === 'string') return true; // URL або пусто — пропускаємо
      return f.size <= MAX_FILE_MB * 1024 * 1024;
    })
    .test('type', 'Підтримуються JPG/PNG/WEBP/GIF', (f) => {
      if (!f || typeof f === 'string') return true; // URL або пусто — пропускаємо
      return TYPES.includes(f.type);
    }),
});
