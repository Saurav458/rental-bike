export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightgray px-4">
      <main className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {children}
      </main>
    </div>
  );
}
