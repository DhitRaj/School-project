"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface SchoolForm {
  name: string
  address: string
  city: string
  state: string
  contact: string
  email: string
  image: File | null
}

export default function AddSchool() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<SchoolForm>({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email: "",
    image: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm((prev) => ({ ...prev, image: file }))

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    if (!form.name.trim()) {
      toast({ title: "Error", description: "School name is required", variant: "destructive" })
      return false
    }
    if (!form.address.trim()) {
      toast({ title: "Error", description: "Address is required", variant: "destructive" })
      return false
    }
    if (!form.city.trim()) {
      toast({ title: "Error", description: "City is required", variant: "destructive" })
      return false
    }
    if (!form.state.trim()) {
      toast({ title: "Error", description: "State is required", variant: "destructive" })
      return false
    }
    if (!form.contact.trim()) {
      toast({ title: "Error", description: "Contact number is required", variant: "destructive" })
      return false
    }
    if (!form.contact.match(/^[0-9-+]{10,}$/)) {
      toast({ title: "Error", description: "Please enter a valid phone number", variant: "destructive" })
      return false
    }
    if (!form.email.trim()) {
      toast({ title: "Error", description: "Email is required", variant: "destructive" })
      return false
    }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({ title: "Error", description: "Please enter a valid email address", variant: "destructive" })
      return false
    }
    if (!form.image) {
      toast({ title: "Error", description: "School image is required", variant: "destructive" })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      // Convert image to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string

        // Get existing schools from localStorage
        const existing = localStorage.getItem("schools")
        const schools = existing ? JSON.parse(existing) : []

        // Add new school
        const newSchool = {
          id: Date.now(),
          name: form.name,
          address: form.address,
          city: form.city,
          state: form.state,
          contact: form.contact,
          email: form.email,
          image: imageData,
        }

        schools.push(newSchool)
        localStorage.setItem("schools", JSON.stringify(schools))

        toast({ title: "Success", description: "School added successfully!" })
        router.push("/schools")
      }
      reader.readAsDataURL(form.image!)
    } catch (error) {
      toast({ title: "Error", description: "Failed to add school", variant: "destructive" })
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition">
            School Management
          </Link>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
            <Link href="/schools">
              <Button variant="outline">View Schools</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-3xl">Add a New School</CardTitle>
            <CardDescription>Fill in all the details to register a new school</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* School Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  School Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter school name"
                  className="border-slate-300"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Address *
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  placeholder="Enter school address"
                  className="border-slate-300 min-h-24"
                />
              </div>

              {/* City and State */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">
                    City *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className="border-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    State *
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className="border-slate-300"
                  />
                </div>
              </div>

              {/* Contact and Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-sm font-medium">
                    Contact Number *
                  </Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={form.contact}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="border-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="border-slate-300"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium">
                  School Image *
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border-slate-300 cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-4 relative w-full h-48 bg-slate-100 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {loading ? "Adding..." : "Add School"}
                </Button>
                <Link href="/schools" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
