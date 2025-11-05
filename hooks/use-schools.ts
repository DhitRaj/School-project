"use client"

import { useState, useCallback } from "react"
import type { School, SchoolFormData } from "@/lib/school-utils"
import { getAllSchools, addSchool, deleteSchool, updateSchool } from "@/lib/school-utils"

export const useSchools = () => {
  const [schools, setSchools] = useState<School[]>(getAllSchools())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSchools = useCallback(() => {
    try {
      setSchools(getAllSchools())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch schools")
    }
  }, [])

  const createSchool = useCallback(async (formData: SchoolFormData) => {
    setLoading(true)
    setError(null)
    try {
      const newSchool = await addSchool(formData)
      setSchools((prev) => [...prev, newSchool])
      return newSchool
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add school"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const removeSchool = useCallback((id: number) => {
    try {
      deleteSchool(id)
      setSchools((prev) => prev.filter((s) => s.id !== id))
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete school"
      setError(errorMessage)
      throw err
    }
  }, [])

  const editSchool = useCallback(async (id: number, formData: SchoolFormData) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await updateSchool(id, formData)
      setSchools((prev) => prev.map((s) => (s.id === id ? updated : s)))
      return updated
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update school"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    schools,
    loading,
    error,
    fetchSchools,
    createSchool,
    removeSchool,
    editSchool,
  }
}
