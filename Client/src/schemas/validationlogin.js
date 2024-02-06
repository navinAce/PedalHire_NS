import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required("please enter your email"),
  password: yup
    .string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
      "Password must be Upper,lower,digit"
    )
    .required("Please enter password "),
});
