export default function (req, res) {
    if (req.method === "GET") {
      const data = { url: null, text: null };
      // Retrieve the copied data from storage
      chrome.storage.local.get("copiedData", (result) => {
        const copiedData = result.copiedData;
        if (copiedData) {
          data.url = copiedData.url;
          data.text = copiedData.text;
        }
        // Return the copied data as JSON
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(data);
      });
    } else if (req.method === "POST") {
      // Get the copied data from the request body
      const { url, text } = req.body;
      // Do something with the copied data, such as save it to a database
      console.log(`Copied data: ${url}: ${text}`);
      // Return a success response
      res.status(200).end();
    } else {
      // Return a 404 error for unsupported methods
      res.status(404).end();
    }
  }
  