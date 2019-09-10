import * as yup from 'yup'

const ContactSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is required'),
  address: yup
    .string()
    .trim()
    .required('Address is required'),
  department: yup
    .string()
    .trim()
    .required('Department is required'),
  numbers: yup
    .array()
    .min(1, 'Atleast one phone number is required')
    .of(
      yup
        .string()
        .trim()
        .required('Invalid phone number')
    )
})

export { ContactSchema }
