// lib/initCsrf.ts
export async function initCsrf() {
  await fetch("http://localhost:5000/api/csrf-token", {
    credentials: "include",
  });
}
