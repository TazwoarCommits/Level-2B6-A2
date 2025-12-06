import { Pool } from "pg";
import config from ".";


const pool = new Pool({
    connectionString : config.connectionStr
}); 

export const initDB = async () => {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL ,
    email VARCHAR(150) UNIQUE NOT NULL CHECK (email = LOWER(email)),
    password VARCHAR(260) NOT NULL CHECK (LENGTH(password) >= 6 ),
    phone VARCHAR(15) NOT NULL , 
    role VARCHAR(12) CHECK (role IN ('customer' , 'admin'))
    )
    `) ;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(150) NOT NULL , 
    type VARCHAR(20) CHECK (type IN ('car','bike','van','SUV')) ,
    registration_number VARCHAR(50) UNIQUE NOT NULL ,
    daily_rent_price NUMERIC(10) NOT NULL CHECK (daily_rent_price > 0 ) , 
    availability_status VARCHAR(10) CHECK (availability_status IN ('available' , 'booked'))
    )
    `) ;  

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings(
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE , 
    vehicle_id INT REFERENCES vehicles(id) , 
    rent_start_date DATE NOT NULL , 
    rent_end_date DATE NOT NULL , 
    total_price INT NOT NULL ,
    status TEXT CHECK (status IN ('active', 'cancelled', 'returned'))
    )
    `) ; 
    
} ; 