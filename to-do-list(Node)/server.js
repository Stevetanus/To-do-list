const http = require("http");

const requestListener = (req, res) => {
  // 不同的 domain 會先發一個 preflight 預檢請求 (OPTIONS API 檢查機制)
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };
  console.log("url", req.url);
  console.log("methods", req.method);
  if (req.url == "/" && req.method == "GET") {
    res.writeHeader(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: [],
      })
    );
    res.end();
  } else {
    res.writeHeader(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "no this route",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(3005);
