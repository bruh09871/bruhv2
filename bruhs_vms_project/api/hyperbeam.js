export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HYPERBEAM_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        start_url: "https://google.com"
      })
    });

    const text = await response.text(); // get raw response
    console.log("Hyperbeam raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({ error: "Invalid JSON from Hyperbeam", raw: text });
    }

    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
