import { pool } from "../../config/db";

const getVehicles = async () => {
    const result = pool.query(`SELECT * FROM vehicles`) ; 
    return result ; 
} ;

const getSingleVehicle = async (id : string) => {
    const result = pool.query(`SELECT * FROM vehicles WHERE id = $1` , [id]) ;
    return result;
}

const deleteVehicle = async (id : string) => {
    const result = pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]) ;
    return result
};

export const vehiclesServices = {
    getVehicles,
    getSingleVehicle ,
    deleteVehicle,
}