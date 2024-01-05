import React from 'react';
// import { ErrorBoundary } from 'react-error-boundary';

// Fallback component
interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const Fallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default Fallback