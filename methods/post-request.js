const crypto = require("crypto"); //generate UUID
const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (req, res) => {
    if (req.url === "/api/movies") {
        try {
            let body = await requestBodyparser(req); // add 'await' to solve 'pending' for body
            console.log("Request Body: ", body);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201, { "Content-Type": "application/json" }); // 201 - content created
            res.end();
        } catch (err) {
            console.log(err);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    title: "Validation Failed",
                    message: "Request body is not valid",
                })
            );
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                title: "Not Found",
                message: "Route not found"
            })
        );
    }
};