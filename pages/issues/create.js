import Head from 'next/head';
import {useToast} from "@chakra-ui/react"

import { useAuth } from '@/lib/auth';

import {DashboardLayout} from "@/layouts/dashboard"

const IssuesCreate = () => {
  const toast = useToast();
  const auth = useAuth();
 
  return <DashboardLayout 
        title="Create issue"
        breadcrumbs={[{label: 'Issues', href: '/issues'}, {label: 'Create'}]}
    >
      <Head>
          <title>Create new issue</title>
      </Head>
    
      
  </DashboardLayout>
};

export default IssuesCreate;