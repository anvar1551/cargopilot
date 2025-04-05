import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-3xl font-bold">Welcome to CargoPilot</h1>
      <Link
        href="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login
      </Link>
    </main>
  );
}
