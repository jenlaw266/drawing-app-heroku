const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const PORT = 8080;
const cors = require("cors");
const pool = require("./db");

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));
App.use(cors());

// get all drawings
App.get("/api/gallery", async (req, res) => {
  try {
    const allDrawings = await pool.query("SELECT * FROM drawings");
    res.json(allDrawings.rows);
  } catch (err) {
    console.log("get gallery error: ", err.message);
  }
});

// post new drawing
App.post("/api/drawing/new", async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const newDrawing = await pool.query(
      "INSERT INTO drawings(name, image, description) VALUES ($1, $2, $3)",
      [name, image, description]
    );
    res.json(newDrawing);
  } catch (err) {
    console.log("post new drawing error: ", err.message);
  }
});

//get 1 drawing
App.get("/api/drawing/:id", async (req, res) => {
  try {
    // console.log("id", req.params.id);
    const { id } = req.params;
    const drawing = await pool.query("SELECT * FROM drawings WHERE id = $1", [
      id,
    ]);
    res.json(drawing.rows[0]);
  } catch (err) {
    console.log("get drawing error: ", err.message);
  }
});

//update 1 drawing
App.put("/api/drawing/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;
    const updateDrawing = await pool.query(
      "UPDATE drawings SET name = $1, image = $2, description = $3 WHERE id = $4 ",
      [name, image, description, id]
    );

    res.json("drawing is updated");
  } catch (err) {
    console.log("update drawing error: ", err.message);
  }
});

//delete 1 drawing
App.delete("/api/drawing/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDrawing = await pool.query(
      "DELETE FROM drawings WHERE id = $1",
      [id]
    );
    res.json("deleted");
  } catch (err) {
    console.log("delete drawing error: ", err.message);
  }
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
