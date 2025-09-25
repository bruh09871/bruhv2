export default async function handler(req, res) {
  try {
    let shared = false;
    if (req.body) {
      if (typeof req.body === "string") {
        shared = JSON.parse(req.body).shared || false;
      } else if (typeof req.body === "object") {
        shared = req.body.shared || false;
      }
    }

    const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HYPERBEAM_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        start_url: "https://google.com",
        collaborative: shared
      })
    });

    const data = await response.json();
    res.status(response.status).json({ embed_url: data.embed_url, vm_id: data.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
