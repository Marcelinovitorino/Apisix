import express from 'express';
import userRoutes from './routes/user.js';
import multerConfig  from './config/multerConfig.js'

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); 

app.use('/', userRoutes);
const port = 6200;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
