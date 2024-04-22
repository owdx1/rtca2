import * as yup from "yup"

export const ChatInputSchema = yup.object().shape({
  message: yup.string().required()
})
