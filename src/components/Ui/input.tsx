"use client"
import cn from "@/utils/cn"
import { cva, VariantProps } from "class-variance-authority"
import { InputHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariant> {
}


export default function Input({ className, variant, Inputsize, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(InputVariant({ variant, Inputsize, className }))}
    />
  )
}


const InputVariant = cva("rounded-md border-2", {
  variants: {
    variant: {
      info: "btn btn-info ",
      danger: "btn-danger",
      succes: "btn-succes",
      default: "text-black border-b-2 bg-white max-md:text-xs  max-md:h-12  border-black p-2 focus:outline-none"
    },
    Inputsize: {
      sm: "text-sm p-3",
      md: "text-base p-5 ",
      lg: "text-xl p-7",
    }
  },
  defaultVariants: {
    variant: "default",
    Inputsize: "md"
  }
})
