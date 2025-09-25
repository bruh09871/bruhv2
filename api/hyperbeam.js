// Launch VM
export default async function handler(req, res) {
  try {
    const { shared } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    
    const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer sk_test_5ECQZME56sa9OHlk4tGJQyFDrLfKObI-MaER414644w`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        start_url: "https://google.com",
        collaborative: shared || false
      })
    });

    const data = await response.json();
    // Return embed_url + vm_id so frontend can destroy/reset
    res.status(response.status).json({
      embed_url: data.embed_url,
      vm_id: data.id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
