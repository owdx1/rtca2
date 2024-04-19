import * as yup from "yup"

export const RegisterSchema = yup.object().shape({
  email: yup.string().email("enter valid email...").required("email is required..."),
  username: yup.string().min(3,"username must be at least 3 digits long...").required("enter username..."),
  password: yup.string().required("enter valid password..."),
  confirmPassword:
    yup
    .string()
    .oneOf([yup.ref("password")], "passwords don't match...")
    .required("enter confirm password...")
})