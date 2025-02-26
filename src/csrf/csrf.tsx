// csrf.js
export async function getCsrfToken() {
  const response = await fetch("/api/get-csrf-token/", {
    credentials: "include",
  });
  const data = await response.json();
  return data.csrfToken;
}
