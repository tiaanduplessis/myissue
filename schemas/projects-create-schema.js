import {object, string} from "yup";

const strings = {
    required: 'Field is required',
    invalidURL: 'Not a valid URL'
}

export const projectsCreateSchema = object().shape({
    name: string().required(strings.required),
    link: string().url(strings.invalidURL),
  });
  