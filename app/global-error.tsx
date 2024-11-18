'use client'

export default function ErrorSage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Something went wrong</h1>
      <p>
        Sorry, we are unable to process your request at this time. Please try
        again later.
      </p>

      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}
