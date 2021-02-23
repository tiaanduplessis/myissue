
import {object, string} from "yup";

const strings = {
    required: 'Field is required',
    problemStatementLength: 'Problem statement should be short and concise'
}

export const bugsCreateSchema = object().shape({
    title: string().required(strings.required),
    overview: string(),
    expecting: string().required(strings.required),
    resulting: string().required(strings.required),
    steps: string().required(strings.required),
    frequency: string().required(strings.required),
    priority: string().required(strings.required),
  });