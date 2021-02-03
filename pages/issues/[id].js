import { getIssueById } from "@/lib/db-admin"

export default function IssueDetail({ issue }) {
  return <h1>Issue detail</h1>
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }) {
  const issue = await getIssueById(params.id)
  return {
    props: { issue },
    revalidate: 1,
  }
}
