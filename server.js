const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

const port = process.env.PORT || 4040;

const SELECT_ALL_POSTS = 'SELECT * FROM blog';

const connection = mysql.createConnection({
  host: 'localhost',
  user: config.user,
  password: config.password,
  database: config.database
});

connection.connect(err => {
  if(err) {
    return err;
  }
});

app.use(cors());

app.use(bodyParser.urlencoded({extended: true,}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Go to /blog');
});

app.get('/blog', (req, res) => {
  connection.query(SELECT_ALL_POSTS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      })
    }
  });
});

app.post('/blog/add', (req, res) => {
  const { date, blogpost, title } = req.body;

  const INSERT_POST = `INSERT INTO blog(date, blogpost, title) VALUES('${date}', '${blogpost}', '${title}')`;
  connection.query(INSERT_POST, (err, results) =>{
    if(err){
      return res.send(err);
    }else {
      return res.send('successfully added post');
    }
  });
});

app.put('/blog/:id', (req, res) => {
  const inserts = [req.body.date, req.body.blogpost, req.body.title, req.params.id];
  const UPDATE_POST = 'UPDATE blog SET date=?, blogpost=?, title=? WHERE id=?';
  connection.query(UPDATE_POST, inserts, (err, results) => {
    if(err){
      return res.send(err);
    }else {
      return res.json({
        data: results
      })
    }
  });
});

app.delete('/blog/:id', (req, res) => {
  const DELETE_POST = 'DELETE FROM blog WHERE id=?';
  const id = req.params.id;
  console.log(id);
  connection.query(DELETE_POST, id, (err, results) => {
    if(err) {
      return res.send(err);
    }else {
      //console.log('Deleted post id ' + id);
      return res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
})
