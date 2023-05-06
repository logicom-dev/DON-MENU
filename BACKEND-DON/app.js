const express = require('express');
const app = express();
const cors = require('cors');

const articleRouter = require("./routes/articles.route")
const categorieRouter = require("./routes/categories.route")

app.use(express.json());
app.use(cors());

app.use('/api/articles', articleRouter);

app.use('/api/categorie', categorieRouter);

//static images folder


app.use('/public', express.static('public'));
// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(port, () => console.log('Server listening on port ' + port));
