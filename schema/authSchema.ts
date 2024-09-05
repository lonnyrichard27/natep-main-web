import * as yup from 'yup';
import {
  emailRegex,
  lettersNumRegex,
  numberRegex,
  phoneRegex,
  stringRegex,
} from './schemaRegex';

const objectShape = {
  value: yup.string().required('Please select an option'),
  label: yup.string().required('Please select an option'),
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required'),
});

const signUpSchema = yup.object().shape({
  nin: yup
    .string()
    .required('NIN is required')
    .length(11, 'Please enter a valid NIN!'),
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(phoneRegex, 'Invalid phone format')
    .required('Phone is required')
    .min(10, 'Enter a valid phone number'),
});

export { loginSchema, signUpSchema };
