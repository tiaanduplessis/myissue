import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { useToast, Button } from "@chakra-ui/react"
import useSWR from "swr"
import { HiPlus } from "react-icons/hi"

import { useAuth } from "@/lib/auth"

import { PageLayout } from "@/layouts/page"

import { BugsTableSkeleton } from "@/components/bugs-table-skeleton"
import { BugsTable } from "@/components/bugs-table"
import { BugsEmptyDashboard } from "@/components/bugs-empty-dashboard"

import { PRIMARY_COLOR_SCHEME } from "@/styles/theme"

const Dashboard = () => {
  const toast = useToast()
  const router = useRouter()
  const { user } = useAuth()

  const { projectId } = router.query
  const { data, error } = useSWR(
    user ? (projectId ? `/api/projects/${projectId}/bugs` : "/api/bugs") : null
  )

  useEffect(() => {
    if (error) {
      toast({
        title: "Oh noes!",
        description: "We failed to load your bugs.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }, [error])

  const href = projectId
    ? `/bugs/create?projectId=${projectId}`
    : "/bugs/create"

  return (
    <PageLayout
      title={projectId ? `Project's bugs` : "All bugs"}
      breadcrumbs={[{ label: "Bugs" }]}
      actions={[
        <NextLink key="create-new-bug" href={href}>
          <Button colorScheme={PRIMARY_COLOR_SCHEME} leftIcon={<HiPlus />}>
            Create new bug
          </Button>
        </NextLink>,
      ]}
    >
      <Head>
        <title>Bugs</title>
      </Head>
      {!data ? (
        <BugsTableSkeleton />
      ) : data?.bugs?.length > 0 ? (
        <BugsTable bugs={data?.bugs} />
      ) : (
        <BugsEmptyDashboard href={href} />
      )}
    </PageLayout>
  )
}

export default Dashboard
