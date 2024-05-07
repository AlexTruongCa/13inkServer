module.exports.handler = function (event, context, callback) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return callback(null, {
      statusCode: 200,
      headers,
      body: "Preflight request accepted",
    });
  }

  callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: "Welcome to my API" }),
  });
};
