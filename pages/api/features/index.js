import { getAllFeaturesForUser } from "@/lib/db-admin"
import { auth } from "@/lib/firebase-admin"

export default async (req, res) => {
  const { uid } = await auth.verifyIdToken(req.headers.authorization)
  const bugs = await getAllFeaturesForUser(uid)
  res.status(200).json(bugs)
}
