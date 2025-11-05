"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface School {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: string
  email: string
  image: string
}

export default function Schools() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load schools from localStorage
    const stored = localStorage.getItem("schools")
    if (stored) {
      setSchools(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition">
              School Management
            </Link>
            <Link href="/add-school">
              <Button className="bg-blue-600 hover:bg-blue-700">Add School</Button>
            </Link>
          </div>
        </nav>
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-500">Loading schools...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition">
            School Management
          </Link>
          <Link href="/add-school">
            <Button className="bg-blue-600 hover:bg-blue-700">Add School</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Schools Directory</h1>
          <p className="text-slate-600">Browse all registered schools in our network</p>
        </div>

        {schools.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-slate-500 text-lg mb-4">No schools registered yet</p>
              <Link href="/add-school">
                <Button className="bg-blue-600 hover:bg-blue-700">Add First School</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <Card key={school.id} className="border-0 shadow-lg hover:shadow-xl transition overflow-hidden">
                {/* Image Section */}
                <div className="relative w-full h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={school.image || "/placeholder.svg"}
                    alt={school.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>

                {/* Content Section */}
                <CardContent className="pt-4 pb-4">
                  <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{school.name}</h2>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Address:</span> {school.address}
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">City:</span> {school.city}, {school.state}
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2 mb-4">
                    <p className="text-sm">
                      <span className="font-semibold text-slate-900">Phone:</span>{" "}
                      <span className="text-slate-600">{school.contact}</span>
                    </p>
                    <p className="text-sm break-all">
                      <span className="font-semibold text-slate-900">Email:</span>{" "}
                      <span className="text-blue-600 hover:underline cursor-pointer">{school.email}</span>
                    </p>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                    onClick={() => (window.location.href = `mailto:${school.email}`)}
                  >
                    Contact School
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
