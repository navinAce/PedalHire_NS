import * as yup from "yup";

export const listARideSchema = yup.object({
  bikenamemodel: yup
    .string()
    .min(5)
    .max(40)
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Bike name & model can only contain alphanumeric characters"
    )
    .required("Please enter bike name"),
  bikenumber: yup
    .string()
    .max(10)
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/, "Check the above format"),
  priceperday: yup
    .string()
    .max(4)
    .matches(/^\d{1,4}$/, "Invalid price")
    .required("Please enter price"),
  priceperweek: yup
    .string()
    .max(5)
    .matches(/^\d{1,5}$/, "Invalid price")
    .required("Please enter price"),
  location: yup
    .string()
    .max(6)
    .matches(/^\d{6}$/, "Invalid zipcode")
    .required("Please enter location"),
  willingtodeliver: yup.string().required("Please select any one option"),
  availablefromdate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required("Please enter date"),
  availabletodate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required("Please enter date"),
});
