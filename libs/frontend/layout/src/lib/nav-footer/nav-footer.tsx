import { Button } from '@frontend/ui';
import { PlusCircle } from 'lucide-react';

export function NavFooter() {
  return (
    <Button className="w-full" size="sm">
      <PlusCircle className="mr-2 h-4 w-4" />
      Test Footer
    </Button>
  );
}

export default NavFooter;
