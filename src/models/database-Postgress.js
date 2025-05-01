import { sql } from '../models/db.js'; 

export class DatabasePostgress {
  // Listar usuários (com filtro opcional por name ou email)
  async list(search) {
    let users;
    if (search) {
      users = await sql`
        SELECT u.*, 
          COALESCE(json_agg(i.filename) FILTER (WHERE i.filename IS NOT NULL), '[]') AS images
        FROM users u
        LEFT JOIN user_images i ON u.id = i.user_id
        WHERE u.name ILIKE '%' || ${search} || '%'
           OR u.email ILIKE '%' || ${search} || '%'
        GROUP BY u.id
        ORDER BY u.id ASC
      `;
    } else {
      users = await sql`
        SELECT u.*, 
          COALESCE(json_agg(i.filename) FILTER (WHERE i.filename IS NOT NULL), '[]') AS images
        FROM users u
        LEFT JOIN user_images i ON u.id = i.user_id
        GROUP BY u.id
        ORDER BY u.id ASC
      `;
    }
    return users;
  }
  
  // Criar novo usuário
  async create(user) {
    const { name, email, images } = user;
  
    const result = await sql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      RETURNING id
    `;
    const userId = result[0].id;
  
    if (Array.isArray(images)) {
      for (const filename of images) {
        await sql`
          INSERT INTO user_images (user_id, filename)
          VALUES (${userId}, ${filename})
        `;
      }
    }
  }
  

  // Atualizar usuário por ID
  async update(id, user) {
    const { name, email, image } = user;
    await sql`
      UPDATE users 
      SET name = ${name}, email = ${email}, image = ${image} 
      WHERE id = ${id}
    `;
  }

  // Deletar usuário por ID
  async delete(id) {
    await sql`DELETE FROM users WHERE id = ${id}`;
  }

  // Buscar usuário por ID
  async getById(id) {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    return result[0]; // Retorna apenas um objeto
  }
}
