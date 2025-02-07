const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");
const config = require("./config");
async function query(sql, params) {
  try {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(sql, params);

    return results;
  } catch (error) {
    console.error(error.message);
  }
}
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: "*" }));

app.get("/api/department", async function (req, res, next) {
  try {
    const result = await query("SELECT * FROM department");

    res.json(result);
  } catch (err) {
    console.error("Greška u čitanju ", err.message);
    next(err);
  }
});
app.put("/api/department", async function (req, res, next) {
  try {
    const result = await query(
      "UPDATE department SET name=:name WHERE id=:id",
      {
        id: req.body.id,
        name: req.body.name,
      }
    );

    res.json(result);
  } catch (err) {
    console.error("Greška u ažuriranju ", err.message);
    next(err);
  }
});
app.post("/api/department", async function (req, res, next) {
  try {
    const result = await query("INSERT INTO department (name) VALUES (:name)", {
      name: req.body.name,
    });

    res.json(result);
  } catch (err) {
    console.error("Greška u ubacivanju ", err.message);
    next(err);
  }
});
app.delete("/api/department", async function (req, res, next) {
  console.log(req.body);
  try {
    const result = await query("DELETE FROM department WHERE id=:id", {
      id: req.body.id,
    });

    res.json(result);
  } catch (err) {
    console.error("Greška u brisanju ", err.message);
    next(err);
  }
});

app.get("/api/studyProgram", async function (req, res, next) {
  try {
    const result = await query(
      "SELECT department.name as department_name, " +
        "       study_program.id, study_program.id_department, study_program.name, study_program.code, study_program.level, study_program.type, study_program.semester_num, study_program.academic_year " +
        "FROM study_program INNER JOIN department ON study_program.id_department = department.id"
    );

    res.json(result);
  } catch (err) {
    console.error("Greška u čitanju ", err.message);
    next(err);
  }
});
app.put("/api/studyProgram", async function (req, res, next) {
  try {
    const result = await query(
      "UPDATE study_program " +
        "SET id_department=:id_department, " +
        "    name=:name,  " +
        "    code=:code,  " +
        "    level=:level, " +
        "    type=:type,  " +
        "    semester_num=:semester_num,  " +
        "    academic_year=:academic_year " +
        "WHERE id=:id",
      {
        id: req.body.id,
        id_department: req.body.id_department,
        name: req.body.name,
        code: req.body.code,
        level: req.body.level,
        type: req.body.type,
        semester_num: req.body.semester_num,
        academic_year: req.body.academic_year,
      }
    );

    res.json(result);
  } catch (err) {
    console.error("Greška u ažuriranju ", err.message);
    next(err);
  }
});
app.post("/api/studyProgram", async function (req, res, next) {
  try {
    const result = await query(
      "INSERT INTO study_program " +
        "(id_department, name, code, level, type, semester_num, academic_year) " +
        " VALUES (:id_department, :name, :code, :level, :type, :semester_num, :academic_year)",
      {
        id_department: req.body.id_department,
        name: req.body.name,
        code: req.body.code,
        level: req.body.level,
        type: req.body.type,
        semester_num: req.body.semester_num,
        academic_year: req.body.academic_year,
      }
    );

    res.json(result);
  } catch (err) {
    console.error("Greška u ubacivanju ", err.message);
    next(err);
  }
});
app.delete("/api/studyProgram", async function (req, res, next) {
  console.log(req.body);
  try {
    const result = await query("DELETE FROM study_program WHERE id=:id", {
      id: req.body.id,
    });

    res.json(result);
  } catch (err) {
    console.error("Greška u brisanju ", err.message);
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
