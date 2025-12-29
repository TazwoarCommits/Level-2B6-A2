import { Request } from "express";
import { pool } from "../../config/db";

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

// const getSingleUser = async (id: string) => {
//   const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

//   return result;
// };

const deleteUser = async (id : string) => {
  
  const activeBooking = await pool.query(`
    SELECT 1 FROM bookings WHERE customer_id= $1 AND status IN ( 'active' ) LIMIT 1
    ` , [id]) ; 

    if(activeBooking.rows.length > 0){
      return {
        status : "forbidden" 
      } ; 
    } ; 

    const deleteResult = await pool.query(`DELETE FROM users WHERE id = $1 ` , [id]) ; 

    if(deleteResult.rowCount === 0 ){
      return {
        status : "not_found" , 
      }
    }

    if(deleteResult.rowCount === 1){
      return {
        status : "success",
      }
    }
    
}

const updateUser = async (req : Request) => {

  if(req?.user?.role === "customer" && req.user?.id !== Number(req.params.id)){
        return {
          status : "forbidden"
        } 
  } ;

  if(req?.body?.role && req?.user?.role !== "admin"){
    return {status : "unauthorized"}
  } ; 

  
  const user = await pool.query(`SELECT id, name , email , phone , role FROM users WHERE id = $1` , [req.params.id]) ;

    if (user.rowCount === 0) {
    return { status: "not_found" };
  }

  const name = req.body.name ? req.body.name : user.rows[0].name ;
  const email = req.body.email ? req.body.email : user.rows[0].email ;
  const phone = req.body.phone ? req.body.phone : user.rows[0].phone ;
  const role = req.body.role ? req.body.role : user.rows[0].role ;

  const updatedResult = await pool.query(`UPDATE users SET name = $1 , email = $2 , phone = $3 , role = $4 WHERE id = $5 RETURNING
    id , name , email, phone, role`,
    [name , email , phone , role ,req.params.id]
  ) 
 
  return {
    status : "success",
    result : updatedResult.rows[0] 
  }
  
}

export const usersServices = {
  getUsers,
  deleteUser , 
  updateUser
};
