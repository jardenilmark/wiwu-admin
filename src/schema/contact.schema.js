import * as yup from 'yup'

const ContactSchema = yup.object().shape({
  name: yup.string('Invalid Name').required('Name is required'),
  address: yup.string('Invalid Address').required('Address is required'),
  department: yup
    .string('Invalid Department')
    .required('Department is required'),
  numbers: yup.array().required('Atleast one number is required')
})

export { ContactSchema }
