import { pool } from "../../config/db";

const getBookings = async () => {
    const result = pool.query(`SELECT * FROM bookings`) ; 
    return result ; 
} ;


const deleteBookings = async (id : string) => {
   const result = pool.query(`DELETE FROM bookings WHERE id = $1` , [id]) ; 
   return result ; 
}

export const bookingsServices = {
    getBookings , 
    deleteBookings, 
}