export default async function handler(req, res) {
  try {
    const { vm_id } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!vm_id) return res.status(400).json({ error: "No vm_id provided" });

    const response = await fetch(`https://engine.hyperbeam.com/v0/vm/${vm_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer sk_test_5ECQZME56sa9OHlk4tGJQyFDrLfKObI-MaER414644w`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) res.status(200).json({ success: true });
    else {
      const data = await response.json();
      res.status(response.status).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
