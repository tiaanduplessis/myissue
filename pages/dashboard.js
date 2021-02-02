import Head from 'next/head';

import { useAuth } from '@/lib/auth';
import {DashboardLayout} from "@/layouts/dashboard"

const Dashboard = () => {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }

  return <DashboardLayout>
      <Head>
          <title>Logabug | Dashboard</title>
      </Head>
  </DashboardLayout>
};

export default Dashboard;