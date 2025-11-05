"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">School Management</h1>
          <div className="flex gap-2">
            <Link href="/add-school">
              <Button className="bg-blue-600 hover:bg-blue-700">Add School</Button>
            </Link>
            <Link href="/schools">
              <Button variant="outline">View Schools</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Add a New School</CardTitle>
              <CardDescription>Register a new school in the system with all details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">Fill out the form with:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>School name and contact information</li>
                <li>Address, city, and state</li>
                <li>Email and phone number</li>
                <li>School image/logo</li>
              </ul>
              <Link href="/add-school" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Browse Schools</CardTitle>
              <CardDescription>View all registered schools in our directory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">Discover schools with:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Beautiful school showcases</li>
                <li>Key information at a glance</li>
                <li>Easy to search and filter</li>
                <li>Contact details readily available</li>
              </ul>
              <Link href="/schools" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">View All</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
