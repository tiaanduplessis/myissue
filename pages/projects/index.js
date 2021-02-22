import Head from "next/head"
import { useEffect } from "react"
import { useToast } from "@chakra-ui/react"
import useSWR from "swr"

import { useAuth } from "@/lib/auth"

import { PageLayout } from "@/layouts/page"

import { ProjectsTable } from "@/components/projects-table"
import { EmptyDashboard } from "@/components/projects-empty-dashboard"
import { ProjectCreateModal } from "@/components/projects-create-modal"
import { ProjectsTableSkeleton } from "@/components/projects-table-skeleton"

const Projects = () => {
  const toast = useToast()
  const { user } = useAuth()
  const { data, error } = useSWR(user ? "/api/projects" : null)

  useEffect(() => {
    if (error) {
      toast({
        title: "Oh noes!",
        description: "We failed to load your projects.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }, [error])

  return (
    <PageLayout
      title="All projects"
      breadcrumbs={[{ label: "Projects" }]}
      actions={[<ProjectCreateModal key="create-new-project">+ Create project</ProjectCreateModal>]}
    >
      <Head>
        <title>Projects</title>
      </Head>
      {!data ? (
        <ProjectsTableSkeleton />
      ) : data?.projects?.length > 0 ? (
        <ProjectsTable projects={data.projects} />
      ) : (
        <EmptyDashboard type="projects" />
      )}
    </PageLayout>
  )
}

export default Projects
