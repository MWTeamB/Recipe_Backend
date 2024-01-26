import cors from "cors";
import express from "express";
import pkg from "pg";

const { Pool } = pkg;
/*
Postgres cluster recipedb created
  Username:    postgres
  Password:    0lEslGEailOHOfq
  Hostname:    recipedb.internal
  Flycast:     fdaa:5:35ca:0:1::1b
  Proxy port:  5432
  Postgres port:  5433
  Connection string: postgres://postgres:0lEslGEailOHOfq@recipedb.flycast:5432
*/
const pool = new Pool({
  user: "postgres",
  password: "0lEslGEailOHOfq",
  host: "recipedb.internal",
  database: "postgres",
  port: 5432,
});

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 레시피 다건조회
app.get("/api/v1/recipes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Recipes");
    const listrows = result.rows;

    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: listrows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

// 레시피 단건조회
app.get("/api/v1/recipes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      "SELECT * FROM Recipes WHERE recipe_id = $1",
      [id]
    );
    const listrow = result.rows[0];

    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: listrow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

// 레시피 생성
app.post("/api/v1/recipes", async (req, res) => {
  try {
    const { Field, description, cooking_time } = req.body;

    if (!Field || !description || !cooking_time) {
      res.status(400).json({
        resultCode: "F-1",
        msg: "Field, description, and cooking_time are required",
      });
      return;
    }

    const result = await pool.query(
      "INSERT INTO Recipes (Field, description, cooking_time) VALUES ($1, $2, $3) RETURNING *",
      [Field, description, cooking_time]
    );
    const recordrow = result.rows[0];

    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: recordrow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

// 레시피 수정
app.patch("/api/v1/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { Field, description, cooking_time } = req.body;

  try {
    const checkResult = await pool.query(
      "SELECT * FROM Recipes WHERE recipe_id = $1",
      [id]
    );
    const listrow = checkResult.rows[0];

    if (listrow === undefined) {
      res.status(404).json({
        resultCode: "F-1",
        msg: "not found",
      });
      return;
    }

    await pool.query(
      "UPDATE Recipes SET Field = $1, description = $2, cooking_time = $3 WHERE recipe_id = $4",
      [Field, description, cooking_time, id]
    );

    const updatedResult = await pool.query(
      "SELECT * FROM Recipes WHERE recipe_id = $1",
      [id]
    );
    const updatedListrow = updatedResult.rows[0];
    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: updatedListrow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

// 레시피 삭제
app.delete("/api/v1/recipes/:id", async (req, res) => {
  const { id } = req.params;

  const checkResult = await pool.query(
    "SELECT * FROM Recipes WHERE recipe_id = $1",
    [id]
  );
  const listrow = checkResult.rows[0];

  if (listrow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "not found",
    });
    return;
  }

  try {
    await pool.query("DELETE FROM Recipes WHERE recipe_id = $1", [id]);

    res.json({
      resultCode: "S-1",
      msg: `${id}번 레시피가 삭제 되었습니다`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

// 레시피에 재료 추가
app.post("/api/v1/recipes/:id/ingredients", async (req, res) => {
  try {
    const { id } = req.params;
    const { ingredient_id } = req.body;

    if (!ingredient_id) {
      res.status(400).json({
        resultCode: "F-1",
        msg: "ingredient_id required",
      });
      return;
    }

    const result = await pool.query(
      "INSERT INTO Recipe_Ingredients (recipe_id, ingredient_id) VALUES ($1, $2) RETURNING *",
      [id, ingredient_id]
    );
    const recordrow = result.rows[0];

    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: recordrow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

// 레시피의 재료 조회
app.get("/api/v1/recipes/:id/ingredients", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT i.* FROM Ingredients i INNER JOIN Recipe_Ingredients ri ON i.ingredient_id = ri.ingredient_id WHERE ri.recipe_id = $1",
      [id]
    );
    const listrows = result.rows;

    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: listrows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

// 재료 생성
app.post("/api/v1/ingredients", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        resultCode: "F-1",
        msg: "name required",
      });
      return;
    }

    const result = await pool.query(
      "INSERT INTO Ingredients (name) VALUES ($1) RETURNING *",
      [name]
    );
    const recordrow = result.rows[0];

    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: recordrow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

// 저장창고 기반 레시피 검색
app.get("/api/v1/recipes/search", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT DISTINCT R.* FROM Recipes R INNER JOIN Recipe_Ingredients RI ON R.recipe_id = RI.recipe_id WHERE RI.ingredient_id IN (SELECT ingredient_id FROM Storage)"
    );
    const listrows = result.rows;

    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: listrows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
