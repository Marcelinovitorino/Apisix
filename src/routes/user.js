import { Router } from "express";
import multer from "multer";
import path from "path";

import { DatabasePostgress } from "../models/database-Postgress.js";
import multerConfig from "../config/multerConfig.js";

const routes = Router();
const database = new DatabasePostgress();
const upload = multerConfig;

// Listar usuários
routes.get("/users", async (req, res) => {
  const search = req.query.search;
  const users = await database.list(search);
  return res.json(users);
});

// Criar usuário
routes.post("/users", upload.array('images', 5), async (req, res) => {
  const { name, email } = req.body;
  const images = req.files?.map(file => file.filename);

  await database.create({ name, email, images });

  res.status(200).json({ message: "Usuário criado com sucesso!" });
});


// Atualizar usuário
routes.put("/users/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const image = req.file?.filename;

  await database.update(id, {
    name,
    email,
    image,
  });

  res.status(204).json([]);
});

// Deletar usuário
routes.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  await database.delete(id);
  return res.status(204).json([]);
});

// Buscar usuário por ID
routes.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await database.getById(id);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  res.status(200).json(user);
});

export default routes;
