export const POST = async (req) => {
  const data = await req.json()

  const response = await fetch('http://localhost:5072/api/tasks', {
    method: 'POST',
    body: JSON.stringify({
      description: data.description,
      creator: "rvallejos",
      status: data.status,
      importance: data.importance
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const message = await response.text()

  console.log(message)

  if (!response.ok) {
    return new Response("Failed to create a new task", { status: 500 })
  }

  return new Response("Created successfully", { status: 201 })
}