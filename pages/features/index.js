import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { useToast, Button } from "@chakra-ui/react"
import useSWR from "swr"

import { useAuth } from "@/lib/auth"

import { PageLayout } from "@/layouts/page"

import { FeaturesTableSkeleton } from "@/components/features-table-skeleton"
import { FeaturesTable } from "@/components/features-table"
import { FeaturesEmptyDashboard } from "@/components/features-empty-dashboard"

import {PRIMARY_COLOR_SCHEME} from "@/styles/theme"


const Dashboard = () => {
  const toast = useToast()
  const router = useRouter()
  const {user} = useAuth()

  const { projectId } = router.query
  const { data, error } = useSWR(
    user ? projectId ? `/api/projects/${projectId}/features` : "/api/features" : null)
   
  useEffect(() => {
    if (error) {
      toast({
        title: "Oh noes!",
        description: "We failed to load your features.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }, [error])

  const href = projectId
    ? `/features/create?projectId=${projectId}`
    : "/features/create"


  return (
    <PageLayout
      title={projectId ? `Project's features` : "All features"}
      breadcrumbs={[{ label: "Features" }]}
      actions={[
        <NextLink key="create-new-feature" href={href}>
          <Button fontWeight="medium" colorScheme={PRIMARY_COLOR_SCHEME}>
            + Create new feature
          </Button>
        </NextLink>,
      ]}
    >
      <Head>
        <title>Features</title>
      </Head>
      {!data ? (
        <FeaturesTableSkeleton />
      ) : data?.features?.length > 0 ? (
        <FeaturesTable features={data.features} />
      ) : (
        <FeaturesEmptyDashboard href={href} />
      )}
    </PageLayout>
  )
}

export default Dashboard
