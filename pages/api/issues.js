import {getAllIssues} from '@/lib/db-admin';

export default async (_, res) => {
  const issues = await getAllIssues()
  res.status(200).json(issues);
};