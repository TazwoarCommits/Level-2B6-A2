import { Request } from "express";
import { pool } from "../../config/db";
import { JwtPayload } from "jsonwebtoken";


const createVehicle = async (req : Request) => {

    const {vehicle_name , type , registration_number , daily_rent_price , availability_status}  = req.body ; 
    const result = await pool.query(`
        INSERT INTO vehicles (vehicle_name , type , registration_number , daily_rent_price , availability_status) VALUES ($1,$2,$3,$4,$5) RETURNING * 
        `, [vehicle_name , type , registration_number , daily_rent_price , availability_status]) ; 
        
    return result ;     
}

const getVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`) ; 
    return result ; 
} ;

const getSingleVehicle = async (id : string) => {
    const result =await pool.query(`SELECT * FROM vehicles WHERE id = $1` , [id]) ;
    return result;
}

const deleteVehicle = async (id : string ) => {
    const queriedVehicle = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]) ;

    if(queriedVehicle.rowCount === 0 ){
        return {status : "NOT_FOUND"} ; 
    } ;
    
    if(queriedVehicle.rows[0].availability_status === "booked"){
        return  {status : "BOOKED"}; 
    }

    await pool.query(`DELETE FROM vehicles WHERE id = $1` , [id]) ; 
    return {status : "DELETED"} ; 
};

export const vehiclesServices = {
    createVehicle , 
    getVehicles,
    getSingleVehicle ,
    deleteVehicle,
}
