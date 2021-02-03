import Head from 'next/head';
import {useRouter} from 'next/router'
import { useToast } from "@chakra-ui/react"
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';

import { DashboardLayout } from "@/layouts/dashboard"

import { ProjectsTable } from "@/components/projects-table"
import { EmptyDashboard } from "@/components/projects-empty-dashboard"
import { ProjectCreateModal } from "@/components/projects-create-modal"
import { ProjectsTableSkeleton } from "@/components/projects-table-skeleton"

import { fetcher } from "@/utils/fetcher"
import { useEffect } from 'react';

const Dashboard = () => {
  const toast = useToast();
  const router = useRouter();
  const auth = useAuth();
  const { data, error } = useSWR('/api/projects', fetcher);
  console.log('data', data)
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

  if (!data) {
    return <DashboardLayout
      title="Projects"
      breadcrumbs={[{ label: 'Projects' }]}
    >
      <ProjectsTableSkeleton />
    </DashboardLayout>
  }

  return <DashboardLayout
    title="All projects"
    breadcrumbs={[{ label: 'Projects' }]}
    actions={[
      <ProjectCreateModal>
        + Create project
        </ProjectCreateModal>,
    ]}
  >
    <Head>
      <title>Projects</title>
    </Head>

    {data.projects.length > 0 ? <ProjectsTable projects={data.projects} /> : <EmptyDashboard type="projects" />}
  </DashboardLayout>
};

export default Dashboard;