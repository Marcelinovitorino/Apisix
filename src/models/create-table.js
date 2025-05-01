import { sql } from "./db.js";

// sql`
// CREATE TABLE videos (
//   id SERIAL PRIMARY KEY,
//   nome TEXT NOT NULL,
//   email TEXT,
//   image TEXT
// )
// `
//Tabela de imagens associadas a usuários
sql`
CREATE TABLE user_images (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL
);

`
.then(() => {
  console.log("Tabela criada com sucesso!");
})
.catch((error) => {
  console.error("Erro ao criar a tabela:", error);
});
