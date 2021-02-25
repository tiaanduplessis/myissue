import { object, string } from "yup"

const strings = {
  required: "Field is required",
  problemStatementLength: "Problem statement should be short and concise",
}

export const featuresCreateSchema = object().shape({
  type: string().required(strings.required),
  problem: string()
    .max(300, strings.problemStatementLength)
    .required(strings.required),
  impact: string().required(strings.required),
  cost: string().required(strings.required),
  goal: string().required(strings.required),
  need: string().required(strings.required),
  solution: string().required(strings.required),
  priority: string().required(strings.required),
})
