import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, id, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        {...props}
        className="rounded-[var(--control-border-radius)] border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  )
})

Input.displayName = 'Input'
