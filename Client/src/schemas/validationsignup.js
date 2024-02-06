import * as yup from "yup";

export const signUpSchema = yup.object({
  username: yup
    .string()
    .min(3)
    .max(20)
    .matches(
      /^[a-z0-9_]+$/,
      "Username can only contain alphanumeric characters and underscores"
    )
    .required("Please enter username"),
  fullname: yup
    .string()
    .min(2)
    .max(40)
    .matches(/^[a-zA-Z ]+$/, "Fullname can only contain characters")
    .required("Please enter fullname"),
  email: yup.string().email().required("please enter your email"),
  password: yup
    .string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
      "Password must be Upper,lower,digit"
    )
    .required("Please enter password "),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only numeric characters")
    .max(10, "Phone number cannot exceed 10 characters")
    .required("Enter your phone number"),
});
