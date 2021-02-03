import { useEffect } from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import {useToast, Button} from "@chakra-ui/react"
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';

import {DashboardLayout} from "@/layouts/dashboard"

import {IssuesTableSkeleton} from "@/components/issues-table-skeleton"
import {IssuesTable} from "@/components/issues-table"

import {fetcher} from "@/utils/fetcher"
import { IssuesEmptyDashboard } from '@/components/issues-empty-dashboard';

const Dashboard = () => {
  const toast = useToast();
  const router = useRouter()
  const auth = useAuth();

  const {projectId} = router.query
  const { data, error } = useSWR(projectId ? `/api/projects/${projectId}/issues`  : '/api/issues', fetcher); 

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

  const href = projectId ? `/issues/create?projectId=${projectId}` : '/issues/create'

  return <DashboardLayout 
        title={projectId ? `Project's issues` : 'All issues'} 
        breadcrumbs={[{label: 'Issues'}]}
        actions={[
          <NextLink
          href={href}
          >
            <Button fontWeight="medium" colorScheme="purple">
                + Create new issue
            </Button>
          </NextLink>
        ]}
    >
      <Head>
          <title>Issues</title>
      </Head>
        {!data ? <IssuesTableSkeleton/> : data.issues.length > 0 ? <IssuesTable issues={data.issues} /> : <IssuesEmptyDashboard href={href}/>}
  </DashboardLayout>
};

export default Dashboard;