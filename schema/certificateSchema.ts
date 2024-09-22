import * as yup from 'yup';
import {
  emailRegex,
  lettersNumRegex,
  numberRegex,
  phoneRegex,
  stringRegex,
} from './schemaRegex';

const objectShape = {
  label: yup.string().required('Please select an option'),
  value: yup.string().required('Please select an option'),
};

const pickDateSchema = yup.object().shape({
  selectedDate: yup
    .date()
    .nullable() // Allow null values
    .required('Date is required')
    .min(new Date(), 'Date cannot be in the past'),
  time: yup
    .string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format')
    .required('Time is required'),
});

const requestDeliverySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(phoneRegex, 'Invalid phone format')
    .required('Phone is required')
    .min(10, 'Enter a valid phone number'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  address: yup.string().required('Address is required'),
});

const verifyCertSchema = yup.object().shape({
  certificate_id: yup.string().required('Certificate ID is required'),
});

export { pickDateSchema, requestDeliverySchema, verifyCertSchema };
