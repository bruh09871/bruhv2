export default async function handler(req, res) {
  try {
    const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer sk_live_26e2qaRQNBOLEd2l62x6MmftCqD4Pt4-IdHPZrufCYE`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ start_url: "https://google.com" })
    });

    const data = await response.json();
    res.status(response.status).json({
      embed_url: data.embed_url,
      vm_id: data.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
