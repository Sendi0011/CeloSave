"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAppKit } from "@reown/appkit/react"
import { useAccount } from "wagmi"
import { Coins } from "lucide-react"

export function Header() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-105">
              <Coins className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              CeloSave
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="#features"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg hover:bg-accent/50"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg hover:bg-accent/50"
            >
              How It Works
            </Link>
            <Link
              href="#security"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg hover:bg-accent/50"
            >
              Security
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isConnected ? (
              <>
                <Button variant="ghost" asChild className="hidden sm:flex hover:bg-accent/50 transition-all duration-200">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button 
                  onClick={() => open()} 
                  variant="outline"
                  className="font-mono text-xs border-border/50 hover:border-border hover:bg-accent/30 transition-all duration-200"
                >
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => open()} 
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
