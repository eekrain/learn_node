const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html><body>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="msg"><button type="submit">send</button>'
    );
    res.write("</body></html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const msg = parsedBody.split("=")[1];
      fs.writeFile("message.txt", msg, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html><body><h1>");
  res.write("Hello from Node!");
  res.write("</h1></body></html>");
  res.end();
};

// module.exports = {
//   handler: requestHandler,
//   someText: "some text ",
// };

// exports.handler = requestHandler;
// exports.someText = "some hard coded text";

module.exports.handler = requestHandler;
module.exports.someText = "some hard coded text lol";
