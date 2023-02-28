const http = require("http");
const { v4: uuidv4 } = require("uuid");
const { handleError, createError } = require("./handleError");

const hostname = "127.0.0.1";
const port = 3000;

const todos = {};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === "/todos") {
    switch (method) {
      case "GET":
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(todos));
        break;
      case "POST":
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const todo = JSON.parse(body);
            if (!todo.title) {
              throw createError(400, "Title is required.");
            }
            const id = uuidv4();
            todos[id] = { id, ...todo };
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(todos[id]));
          } catch (err) {
            handleError(err, res);
          }
        });
        break;
      case "DELETE":
        const deleteId = url.split("/")[2];
        if (!todos[deleteId]) {
          handleError(createError(404, "Todo not found."), res);
          return;
        }
        delete todos[deleteId];
        res.statusCode = 204;
        res.end();
        break;
      case "PATCH":
        let patchBody = "";
        req.on("data", (chunk) => {
          patchBody += chunk.toString();
        });
        req.on("end", () => {
          try {
            const patchId = url.split("/")[2];
            const patchData = JSON.parse(patchBody);
            if (!todos[patchId]) {
              throw createError(404, "Todo not found.");
            }
            todos[patchId] = { ...todos[patchId], ...patchData };
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(todos[patchId]));
          } catch (err) {
            handleError(err, res);
          }
        });
        break;
      default:
        res.statusCode = 405;
        res.end();
        break;
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
