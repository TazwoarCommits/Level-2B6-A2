import { pool } from "../../config/db";

const getVehicles = async () => {
    const result = pool.query(`SELECT * FROM vehicles`) ; 
    return result ; 
} ;

export const vehiclesServices = {
    getVehicles,
}