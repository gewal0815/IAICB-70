export default function(req, res) {
    if (req.method === "POST") {
      var data = req.body.data;
      // Store the data in a database or file
      res.status(200).json({message: "Data received"});
    }
  }
  