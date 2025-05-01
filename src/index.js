import express from 'express';
import userRoutes from './routes/user.js';
import multerConfig  from './config/multerConfig.js'
import cors from 'cors'

const app = express();


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); 

app.use('/', userRoutes);
const PORT = process.env.PORT|| 6200;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
