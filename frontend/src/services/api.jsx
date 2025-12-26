const BASE_URL = 'http://localhost:3000'; 
// use local IP if testing on mobile

export async function submitUser(data) {
  const res = await fetch(`${BASE_URL}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
