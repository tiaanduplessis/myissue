import { getBugById } from "@/lib/db-admin"

export default function BugDetail({ bug }) {
  return <h1>Bug detail</h1>
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }) {
  const bug = await getBugById(params.id)
  return {
    props: { bug },
    revalidate: 1,
  }
}
