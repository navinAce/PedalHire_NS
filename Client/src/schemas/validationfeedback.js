import * as yup from "yup";

export const validationFeedbackSchema = yup.object({
    name:yup
    .string()
    .min(2)
    .max(40)
    .matches(/^[a-zA-Z ]+$/, "Fullname can only contain characters")
    .required("Please enter fullname"),

  email: yup.string().email().required("please enter your email"),

  comments: yup.string()
  .min(3)
  .required("Please enter your message"),
});