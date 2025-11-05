export interface School {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: string
  email: string
  image: string
}

export interface SchoolFormData {
  name: string
  address: string
  city: string
  state: string
  contact: string
  email: string
  image: File | null
}

// Get all schools from localStorage
export const getAllSchools = (): School[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("schools")
  return stored ? JSON.parse(stored) : []
}

// Save schools to localStorage
export const saveSchools = (schools: School[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("schools", JSON.stringify(schools))
}

// Add a new school
export const addSchool = async (formData: SchoolFormData): Promise<School> => {
  return new Promise((resolve, reject) => {
    if (!formData.image) {
      reject(new Error("Image is required"))
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const schools = getAllSchools()
      const newSchool: School = {
        id: Date.now(),
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        contact: formData.contact,
        email: formData.email,
        image: reader.result as string,
      }

      schools.push(newSchool)
      saveSchools(schools)
      resolve(newSchool)
    }

    reader.onerror = () => {
      reject(new Error("Failed to read image"))
    }

    reader.readAsDataURL(formData.image)
  })
}

// Delete a school
export const deleteSchool = (id: number): void => {
  const schools = getAllSchools().filter((school) => school.id !== id)
  saveSchools(schools)
}

// Update a school
export const updateSchool = async (id: number, formData: SchoolFormData): Promise<School> => {
  return new Promise((resolve, reject) => {
    const schools = getAllSchools()
    const schoolIndex = schools.findIndex((s) => s.id === id)

    if (schoolIndex === -1) {
      reject(new Error("School not found"))
      return
    }

    if (!formData.image) {
      // If no new image, use the existing one
      const updatedSchool: School = {
        ...schools[schoolIndex],
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        contact: formData.contact,
        email: formData.email,
      }
      schools[schoolIndex] = updatedSchool
      saveSchools(schools)
      resolve(updatedSchool)
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const updatedSchool: School = {
        ...schools[schoolIndex],
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        contact: formData.contact,
        email: formData.email,
        image: reader.result as string,
      }
      schools[schoolIndex] = updatedSchool
      saveSchools(schools)
      resolve(updatedSchool)
    }

    reader.onerror = () => {
      reject(new Error("Failed to read image"))
    }

    reader.readAsDataURL(formData.image)
  })
}

// Validate form data
export const validateSchoolForm = (formData: SchoolFormData): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}

  if (!formData.name.trim()) {
    errors.name = "School name is required"
  }

  if (!formData.address.trim()) {
    errors.address = "Address is required"
  }

  if (!formData.city.trim()) {
    errors.city = "City is required"
  }

  if (!formData.state.trim()) {
    errors.state = "State is required"
  }

  if (!formData.contact.trim()) {
    errors.contact = "Contact number is required"
  } else if (!formData.contact.match(/^[0-9-+]{10,}$/)) {
    errors.contact = "Please enter a valid phone number"
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required"
  } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "Please enter a valid email address"
  }

  if (!formData.image) {
    errors.image = "School image is required"
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
