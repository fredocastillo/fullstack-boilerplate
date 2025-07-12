import { useState } from 'react';
import { Bell, LogOut, Menu, Search, Settings, User } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
} from '@frontend/ui';
import { ThemeToggle } from '@frontend/components';
import { NavigationUser } from '../interfaces/navigation-user';

export interface HeaderProps {
  user: NavigationUser;
}

export function Header({ user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center md:justify-start">
          <div className="max-w-lg w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input type="search" placeholder="Search" className="pl-10" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors">
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
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
