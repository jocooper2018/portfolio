import "./index.css";
import React from "react";

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends React.Component<
  GlobalErrorBoundaryProps,
  State
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(_: Error): State {
  //   return { hasError: true };
  // }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("Uncaught error:", error, info);
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h1>An error has occurred.</h1>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
