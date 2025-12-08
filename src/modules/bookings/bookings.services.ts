import { pool } from "../../config/db";

const getBookings = async () => {
    const result = pool.query(`SELECT * FROM bookings`) ; 
    return result ; 
} ;


export const bookingsServices = {
    getBookings , 
}