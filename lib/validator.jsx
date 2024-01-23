import * as yup from "yup";

export const eventFormSchema = yup.object().shape({

    title: yup.string().min(3, 'title must be at least 3 characters long').required("title field missing."),
    description: yup.string().min(3, 'Description must be at least 3 characters long').max(400,'Description must be less than 400 characters long').required("Description field missing."),
    localtion: yup.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters'),
    imageUrl: yup.string(),
  startDateTime: yup.date(),
  endDateTime: yup.date(),
  categoryId: yup.string(),
  price: yup.string(),
  isFree: yup.boolean(),
  url: yup.string().url()
  });
