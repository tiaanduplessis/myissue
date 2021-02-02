import { useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link'
import {useToast, Link, Button} from "@chakra-ui/react"
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';

import {DashboardLayout} from "@/layouts/dashboard"

import {ProjectsTable} from "@/components/projects-table"
import {EmptyDashboard} from "@/components/empty-dashboard"
import {ProjectsTableSkeleton} from "@/components/projects-table-skeleton"

import {fetcher} from "@/utils/fetcher"

const Dashboard = () => {
  const toast = useToast();
  const auth = useAuth();
  const { data, error } = useSWR('/api/issues', fetcher); 

  useEffect(() => {
    if (error) {
      toast({
        title: "Oh noes!",
        description: "We failed to load your issues.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }, [error]) 

  if (!data) {
    return  <DashboardLayout 
      type="issues" 
        breadcrumbs={[{label: 'Issues'}]}
    >
      <ProjectsTableSkeleton/>
    </DashboardLayout>
  }

  return <DashboardLayout 
        type="issues" 
        breadcrumbs={[{label: 'Issues'}]}
        actions={[
          <NextLink href="/issues/create" >
            <Button fontWeight="medium" >
            + Create new issue
            </Button>
          </NextLink>
        ]}
    >
      <Head>
          <title>Issues</title>
      </Head>
    
      {/* {data.projects.length > 0 ? <ProjectsTable projects={data.issues} />: <EmptyDashboard type="projects"/>} */}
  </DashboardLayout>
};

export default Dashboard;