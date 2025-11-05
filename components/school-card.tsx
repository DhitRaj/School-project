"use client"

import type { School } from "@/lib/school-utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SchoolCardProps {
  school: School
  onDelete?: (id: number) => void
  onEdit?: (school: School) => void
  showActions?: boolean
}

export function SchoolCard({ school, onDelete, onEdit, showActions = true }: SchoolCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition overflow-hidden">
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

        {/* Action Buttons */}
        {showActions ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              onClick={() => (window.location.href = `mailto:${school.email}`)}
            >
              Contact
            </Button>
            {onEdit && (
              <Button
                variant="outline"
                className="flex-1 border-slate-200 bg-transparent"
                onClick={() => onEdit(school)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                onClick={() => onDelete(school.id)}
              >
                Delete
              </Button>
            )}
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
            onClick={() => (window.location.href = `mailto:${school.email}`)}
          >
            Contact School
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
