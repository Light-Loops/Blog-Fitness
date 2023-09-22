import * as yup from 'yup';

export const LoginValidate = yup.object().shape({
  email: yup.string().trim().required('El email es requerido'),
  password: yup
    .string()
    .trim()
    .required('El password es requerido')
    .min(4, 'El minimo debe ser 4 caracteres')
    .max(20, 'El maximo debe ser 20 caracteres'),
});