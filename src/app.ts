import express from "express";
import cors from "cors";

const app = express();

app.set("PORT", process.env.PORT || 8080);

app.use(cors({ credentials: true }));

app.get("/", (req, res) => {
  console.log(req);

  res.send("<h1>Hello World!</h1>");
});

app.listen(app.get("PORT"), () => {
  console.log(`Server is running on PORT:${app.get("PORT")}`);
});
