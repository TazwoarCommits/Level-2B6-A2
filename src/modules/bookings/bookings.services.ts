import { Request } from "express";
import { pool } from "../../config/db";
import dayCount from "../../utiliies/dayCount";

const createBooking = async (req: Request) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

  const dayCounts = dayCount(rent_end_date, rent_start_date);
  // console.log("dayCounts",dayCounts);

  const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
    vehicle_id,
  ]);
  if (vehicle?.rowCount === 0) {
    return { status: "not_found" };
  }

  if (vehicle?.rows[0]?.availability_status === "booked") {
    return { status: "booked" };
  }

  const totalPrice = Number(vehicle?.rows[0]?.daily_rent_price) * dayCounts;

  const booking = await pool.query(`
        INSERT INTO bookings (customer_id , vehicle_id , rent_start_date , rent_end_date , total_price , status) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING * 
        `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice, "active"]
  );

  console.log("booking",booking.rows[0]);

  if(booking?.rowCount === 1) {
    const updateBookedVehicle = await pool.query(`UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING * ` , ["booked" , vehicle_id]) ;
   
  }

  // await pool.query(`UPDATE vehicles SET availability_status = $1 WHERE id = $2` , ["booked" , vehicle_id]) ;

  // console.log("daily price",vehicle?.rows[0]?.daily_rent_price ,"rowCount", vehicle?.rowCount);
};

const getBookings = async () => {
  const result = pool.query(`SELECT * FROM bookings`);
  return result;
};

const getSingleBooking = async (id: string) => {
  const result = pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
  return result;
};

const deleteBookings = async (id: string) => {
  const result = pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);
  return result;
};

export const bookingsServices = {
  createBooking,
  getBookings,
  deleteBookings,
  getSingleBooking,
};
