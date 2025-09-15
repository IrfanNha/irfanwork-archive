import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import Link from "next/link"

export default function HomePage() {
  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to{" "}
          <span className="text-primary">Blog Platform</span>
        </h1>
        
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          A modern, fast, and secure blog platform built with Next.js 15, 
          Supabase, and TipTap editor. Create and share your stories with the world.
        </p>
        
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Button asChild size="lg">
            <Link href="/articles">
              Browse Articles
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/admin">
              Admin Panel
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3 mt-16">
        <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
          <div className="p-2 bg-primary/10 rounded-full">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Fast & Modern</h2>
          <p className="text-sm text-muted-foreground text-center">
            Built with Next.js 15 and optimized for performance with server-side rendering.
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
          <div className="p-2 bg-primary/10 rounded-full">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Secure & Reliable</h2>
          <p className="text-sm text-muted-foreground text-center">
            Powered by Supabase with row-level security and real-time capabilities.
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
          <div className="p-2 bg-primary/10 rounded-full">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Rich Editor</h2>
          <p className="text-sm text-muted-foreground text-center">
            Advanced TipTap editor with image uploads, formatting, and real-time preview.
          </p>
        </div>
      </div>
    </div>
    </Container>
  )
}