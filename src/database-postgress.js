import {sql} from './db.js'
//
export class DatabasePostgress{
    async list(search) {
        let users;
        if (search) {
            users = await sql`select * from users where name ilike ${'%' + search + '%'}`;
        } else {
            users = await sql`select * from users`;
        }
    
        return users;
    }
    
    
    //
        async create(user){
            const {name,email,image}=user;
            await sql`insert into users(name,email,image) values(${name},${email},${image})`
    }
    
    //
      update(id,user){
    
      }
    
    //
      delete(id){
    
      }
}