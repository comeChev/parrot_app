export async function getUsers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  const responseJson = await response.json();
  if (responseJson.error) {
    console.log(responseJson.error);
    return [];
  }
  return responseJson.data;
}
