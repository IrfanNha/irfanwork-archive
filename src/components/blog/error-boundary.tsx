// src/components/blog/error-boundary.tsx
'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError?: () => void }>
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError?: () => void }) {
  return (
    <div className="p-6 border border-red-200 rounded-lg bg-red-50 text-center">
      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
      <p className="text-sm text-red-600 mb-4">
        {error?.message || 'An unexpected error occurred'}
      </p>
      {resetError && (
        <button 
          onClick={resetError}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  )
}