'use client'

import * as React from 'react'
import { Check } from 'lucide-react'

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, ...props }, ref) => (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className="hidden"
        ref={ref}
        {...props}
      />
      <label
        htmlFor={props.id}
        className={`flex items-center justify-center w-4 h-4 border border-[#8898aa] rounded cursor-pointer transition-colors ${
          props.checked
            ? 'bg-[#635bff] border-[#635bff]'
            : 'bg-white hover:border-[#635bff]'
        } ${indeterminate ? 'bg-[#635bff] border-[#635bff]' : ''}`}
      >
        {(props.checked || indeterminate) && (
          <Check className="w-3 h-3 text-white" />
        )}
      </label>
    </div>
  ),
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
