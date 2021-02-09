import { getAllBugsForUser } from "@/lib/db-admin"

export default async (req, res) => {
  const { uid } = await auth.verifyIdToken(req.headers.authorization)
  const bugs = await getAllBugsForUser(uid)
  res.status(200).json(bugs)
}
