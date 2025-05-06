import express from 'express';
import setPageRoutes from './routes/pageRoutes.js';
const port = 3000

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

setPageRoutes(app);

app.listen(port, () => {
  console.log(`Gaming community app listening on port ${port}`);
})
