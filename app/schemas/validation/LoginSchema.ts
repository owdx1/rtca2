import * as yup from "yup"

export const LoginSchema = yup.object().shape({
  email: yup.string().email("enter valid email...").required("email is required..."),
  password: yup.string().required("enter valid password...")
})