'use client'

import { toast } from "@/hooks/use-toast"

type UserToastOptions = {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function userToast({ title, description, variant = "default" }: UserToastOptions) {
  return toast({ title, description, variant })
}

export function userToastSuccess(title: string, description?: string) {
  return toast({ title, description, variant: "default" })
}

export function userToastError(title: string, description?: string) {
  return toast({ title, description, variant: "destructive" })
}
