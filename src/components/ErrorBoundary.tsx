import { Component, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="text-4xl mb-4">&#9888;&#65039;</div>
          <h1 className="text-xl font-semibold text-text mb-2">Something went wrong</h1>
          <p className="text-text-secondary mb-6">Try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-lime text-black font-semibold rounded-xl"
          >
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
