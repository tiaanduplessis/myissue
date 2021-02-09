import { getAllBugsForProject } from "@/lib/db-admin"
import { auth } from "@/lib/firebase-admin"

export default async (req, res) => {
  const { uid } = await auth.verifyIdToken(req.headers.authorization)
  const bugs = await getAllBugsForProject(uid, req.query.id)
  res.status(200).json(bugs)
}
