const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

//path.resolve()

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log(`listening`);
});

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'students',
  port: '3308'
});  

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database!');
});

app.get('/', (re, res) => {
  return res.json("Form Backend Side")
})

app.post('/add_user', (req, res) => {
  console.log('Received values:', req.body);
  const sql = 'INSERT INTO students_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)';
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database Error: ', err);
      return res.status(500).json({ error: 'Something unexpected has occurred: ' + err.message });
    }
    console.log('Student added successfully', result);
    return res.status(200).json({ success: 'Student added successfully' });
  });
});

app.get("/students_details", (req, res) => {
  const sql = "SELECT * FROM students_details";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.get('/get_student/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM students_details WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Server error: " + err });
    return res.json(result[0]); // Asegúrate de devolver solo el primer (y único) resultado.
  });
});


app.put("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE students_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM students_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});