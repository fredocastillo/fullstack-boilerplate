import { Page, PageHeader } from '@frontend/components';
import { Button } from '@frontend/ui';
import { Plus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const title = 'Dashboard';
  const details =
    "Welcome back! Here's an overview of your jury selection activities.";

  return (
    <Page>
      <PageHeader title={title} details={details}>
        <Link to="/jurors/import">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Import Jurors
          </Button>
        </Link>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </PageHeader>
    </Page>
  );
}

export default Dashboard;
