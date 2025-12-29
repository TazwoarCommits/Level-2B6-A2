import { Request } from "express";
import { pool } from "../../config/db";
// import { JwtPayload } from "jsonwebtoken";


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


const updateVehicle = async (req : Request) => {
    const vehicle = await pool.query(`
        SELECT vehicle_name , type, registration_number, daily_rent_price, availability_status FROM vehicles WHERE id = $1
        ` , [req.params.id]
    ) ;

    if(vehicle.rowCount === 0 ) {
        return {status : "not_found"}
    }

    const vehicle_name = req.body.vehicle_name ? req.body.vehicle_name : vehicle.rows[0].vehicle_name ;
    const type = req.body.type ? req.body.type : vehicle.rows[0].type ;
    const registration_number = req.body.registration_number ? req.body.registration_number : vehicle.rows[0].registration_number ;
    const daily_rent_price = req.body.daily_rent_price ? req.body.daily_rent_price : vehicle.rows[0].daily_rent_price ;
    const availability_status = req.body.availability_status ? req.body.availability_status : vehicle.rows[0].availability_status ;
    

   const updatedResult = await pool.query(`
    UPDATE vehicles SET 
    vehicle_name = $1 ,
    type = $2 ,
    registration_number = $3 ,
    daily_rent_price = $4 ,
    availability_status = $5
    WHERE id = $6
    RETURNING *

    ` , [vehicle_name, type, registration_number , daily_rent_price, availability_status , req.params.id]) ; 


    return {
        status : "success" , 
        result : updatedResult.rows[0] 
    }
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
    updateVehicle ,
    deleteVehicle,
}
