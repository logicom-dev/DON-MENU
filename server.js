const getAuth = require("./routes/auth.route");
const articleRouter = require("./routes/articles.route")
const categorieRouter = require("./routes/categories.route")
const commandeRouter = require("./routes/commande.route")
const express = require('express');
const cors = require('cors'); // Import the cors library
const app = express();
const path = require('path');
const port = process.env.PORT || 6000;

// Use CORS middleware
// Allow requests from a specific domain

// const corsOptions = {
//   origin: 'http://yourfrontenddomain.com',
// };

// app.use(cors(corsOptions));

app.use(cors());

// Middleware
app.use(express.json());

app.use(express.static("client/build"));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get('/commande', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


app.get('/articles', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use(express.static("admin/build"));
app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, 'admin/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get('/admin/articles', function(req, res) {
  res.sendFile(path.join(__dirname, 'admin/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get('/admin/categories', function(req, res) {
  res.sendFile(path.join(__dirname, 'admin/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get('/admin/commande', function(req, res) {
  res.sendFile(path.join(__dirname, 'admin/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use('/api/admin', getAuth);
app.use('/api/articles', articleRouter);
app.use('/api/categorie', categorieRouter);
app.use('/api/commande', commandeRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
