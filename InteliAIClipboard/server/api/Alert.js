// api/alert.js
export default function (req, res) {
    const { text, url } = req.body;
    const message = {
      type: "alert",
      text: text,
      url: url,
    };
    chrome.runtime.sendMessage(message);
    res.end();
  }
  