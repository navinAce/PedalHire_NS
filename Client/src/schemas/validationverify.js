import * as yup from "yup";

export const verifySchema = yup.object({
  address: yup
    .string()
    .min(2)
    .max(100)
    .matches(
      /^[a-zA-Z0-9,. -]+$/,
      "address can only contain alphanumeric characters and comma"
    )
    .required("please enter your address"),
});
