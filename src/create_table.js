import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS users`
//   .then(() => {
//     console.log("Tabela deletada com sucesso!");
//   })
//   .catch((error) => {
//     console.error("Erro ao deletar a tabela:", error);
//   });

sql`
  create table users(
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT,
     image TEXT
  )
`
  .then(() => {
    console.log("Tabela criada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao criar a tabela:", error);
  });
