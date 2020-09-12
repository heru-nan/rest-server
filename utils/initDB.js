const { time } = require("console");
const http = require("http");

function sendRequest(obj) {
  let strObj = JSON.stringify(obj);
  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/usuario",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": strObj.length,
    },
  };
  const req = http.request(options, (res) => {
    console.log(`statusCode ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (err) => {
    console.log(err);
  });

  req.write(strObj);

  req.end;
}

let obj1 = {
  nombre: "user1",
  email: "user1@gmail.com",
  password: "123456",
};

let obj2 = {
  nombre: "user2",
  email: "user2@gmail.com",
  password: "123456",
};

for (let i = 1; i <= 30; i++) {
  setTimeout(
    () =>
      sendRequest({
        nombre: `user${i}`,
        email: `user${i}@gmail.com`,
        password: "123456",
      }),
    1000
  );
}
