import Head from 'next/head';
import {useToast} from "@chakra-ui/react"
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';

import {DashboardLayout} from "@/layouts/dashboard"

import {ProjectsTable} from "@/components/projects-table"
import {EmptyDashboard} from "@/components/empty-dashboard"
import {ProjectsTableSkeleton} from "@/components/projects-table-skeleton"

import {fetcher} from "@/utils/fetcher"
import { useEffect } from 'react';

const Issues = () => {
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
    return  <DashboardLayout type="issues">
      <ProjectsTableSkeleton/>
    </DashboardLayout>
  }

  return <DashboardLayout type="issues"  breadcrumbs={
      
  }>
      <Head>
          <title>Add issue</title>
      </Head>
  </DashboardLayout>
};

export default Issues;