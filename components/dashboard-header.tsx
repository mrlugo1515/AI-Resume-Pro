'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, User, LogOut, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient, useSession } from '@/lib/auth-client'

export function DashboardHeader() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-card rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-text-primary">ForgeCareerAI</span>
          </Link>

          {/* Navigation */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/jobs" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              Job Board
            </Link>
          </div>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                  {session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="hidden sm:inline text-sm text-text-secondary">
                  {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-text-primary">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {session?.user?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/account" className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
