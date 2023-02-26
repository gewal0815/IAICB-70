// data.js

export default function(req, res) {
    if (req.method === "POST") {
    const { text, url } = req.body;
    console.log(`Received data: ${text}\nFrom: ${url}`);
    res.status(200).json({message: "Data received"});
    }
    }