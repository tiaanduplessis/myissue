import {getAllProjects} from '@/lib/db-admin';

export default async (_, res) => {
  const projects = await getAllProjects()
  res.status(200).json(projects);
};