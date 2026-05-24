import React from 'react'

export const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    ref={ref}
    {...props}
  />
))
Button.displayName = 'Button'
