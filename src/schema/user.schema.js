import * as yup from 'yup'

const userSignUpSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^(09)[0-9]{9}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  emailAddress: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .required('Password is required')
    // .matches(!/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])(?!.* ).{8,}$/, 'Password is invalid'),
    .max(13, 'The password you entered is too long')
    .min(8, 'The password you entered is too short'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required')
})

const userSignInSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: yup.string().required('Password is required')
})

export { userSignUpSchema, userSignInSchema }
