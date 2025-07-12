import { LogOut, Settings, User } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  SidebarTrigger,
} from '@frontend/ui';
import { ThemeToggle } from '@frontend/components';
import { User as NavUser } from '../interfaces/navigation-user';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';

export interface HeaderProps {
  user: NavUser;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4 dark:bg-gray-700" />
      <Breadcrumbs />

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback className="bg-blue-600 text-white">
                  {`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col text-sm text-left">
                <span className="text-gray-900 dark:text-white font-medium">
                  {user.displayName}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {user.jobTitle}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
          >
            <DropdownMenuLabel className="text-gray-500 dark:text-gray-400">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-gray-700" />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-gray-700" />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
