"use client"

import type React from "react"
import { useState } from "react"
import type { School, SchoolFormData } from "@/lib/school-utils"
import { validateSchoolForm } from "@/lib/school-utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SchoolFormProps {
  onSubmit: (data: SchoolFormData) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
  initialData?: School
  submitButtonText?: string
}

export function SchoolForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  submitButtonText = "Add School",
}: SchoolFormProps) {
  const [form, setForm] = useState<SchoolFormData>({
    name: initialData?.name || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    contact: initialData?.contact || "",
    email: initialData?.email || "",
    image: null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
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

      // Clear image error
      if (errors.image) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.image
          return newErrors
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    // Validate form
    const validation = validateSchoolForm(form)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    try {
      await onSubmit(form)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to save school")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{submitError}</div>
      )}

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
          className={`border-slate-300 ${errors.name ? "border-red-500" : ""}`}
          disabled={isLoading}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
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
          className={`border-slate-300 min-h-24 ${errors.address ? "border-red-500" : ""}`}
          disabled={isLoading}
        />
        {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
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
            className={`border-slate-300 ${errors.city ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
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
            className={`border-slate-300 ${errors.state ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
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
            className={`border-slate-300 ${errors.contact ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
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
            className={`border-slate-300 ${errors.email ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
          className={`border-slate-300 cursor-pointer ${errors.image ? "border-red-500" : ""}`}
          disabled={isLoading}
        />
        {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
        {imagePreview && (
          <div className="mt-4 relative w-full h-48 bg-slate-100 rounded-lg overflow-hidden">
            <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700">
          {isLoading ? "Saving..." : submitButtonText}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
