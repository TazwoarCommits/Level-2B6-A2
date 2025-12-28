import { Request } from "express";
import { pool } from "../../config/db";
import dayCount from "../../utiliies/dayCount";

const createBooking = async (req: Request) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
  console.log(req.user);
  if (req?.user?.id !== customer_id) {
    return { status: "bad_request" };
  }

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

  const booking = await pool.query(
    `
        INSERT INTO bookings (customer_id , vehicle_id , rent_start_date , rent_end_date , total_price , status) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, 
        customer_id, vehicle_id, 
        TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, 
        TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, 
        total_price, 
        status 
        `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      "active",
    ]
  );

  if (booking?.rowCount === 1) {
    const updateBookedVehicle = await pool.query(
      `UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING * `,
      ["booked", vehicle_id]
    );

    const result = {
      ...booking.rows[0],
      vehicle: {
        vehicle_name: updateBookedVehicle.rows[0].vehicle_name,
        daily_rent_price: updateBookedVehicle.rows[0].daily_rent_price,
      },
    };

    return result;
  }
};

const getBookings = async (req: Request) => {
  const userId = req.user?.id;
  const role = req.user?.role;

  if (role === "admin") {
    const query = `
      SELECT 
        b.id, 
        b.customer_id , 
        b.vehicle_id, 
        TO_CHAR(b.rent_start_date , 'YYYY-MM-DD' ) AS rent_start_date, 
        TO_CHAR(b.rent_end_date , 'YYYY-MM-DD') AS rent_end_date, 
        b.total_price, 
        b.status, 
        json_build_object(
          'name', u.name, 
          'email', u.email
        ) AS customer,
        json_build_object(
          'vehicle_name', v.vehicle_name, 
          'registration_number', v.registration_number
        ) AS vehicle
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  if (role === "customer") {
    const query = `
      SELECT 
        b.id, 
        b.vehicle_id,
        TO_CHAR(b.rent_start_date , 'YYYY-MM-DD' ) AS rent_start_date, 
        TO_CHAR(b.rent_end_date , 'YYYY-MM-DD') AS rent_end_date, 
        b.total_price,
        b.status,
        json_build_object(
          'vehicle_name', v.vehicle_name, 
          'registration_number', v.registration_number,
          'type', v.type
        ) AS vehicle
      FROM bookings b
      JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.customer_id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
};

const updateBooking = async (req: Request) => {
  // customers cases
  if (req.user?.role === "customer") {
    if (req.body.status !== "cancelled") {
      return { status: "bad_request" };
    }

    const booking = await pool.query(
      `SELECT * FROM bookings WHERE id = $1 AND rent_start_date > NOW()`,
      [req.params.id]
    );
    console.log(booking);

    if (booking.rowCount === 0) {
      return { status: "forbidden" };
    }

    if (req.user?.id !== booking.rows[0].customer_id) {
      return { status: "unauthorized" };
    }

    const updatedBooking = await pool.query(
      `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING * `,
      ["cancelled", req.params.id]
    );

    await pool.query(
      `UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING *`,
      ["available", booking.rows[0].vehicle_id]
    );

    return {
      status: "cancelled",
      result: updatedBooking.rows[0],
    };
  }

  // admin cases

  if (req.user?.role === "admin") {
    const booking = await pool.query(
      `
      UPDATE bookings SET status = $1 WHERE id = $2 RETURNING
        id, 
        customer_id, vehicle_id, 
        TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, 
        TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, 
        total_price, 
        status
       `,
      [req.body.status, req.params.id]
    );

    if (!booking.rowCount) {
      return { status: "not_found" };
    }

    const updateVehicle = await pool.query(
      `UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING availability_status`,
      ["available", booking.rows[0].vehicle_id]
    );

    const result = {
      ...booking.rows[0],
      vehicle: {
        availability_status: updateVehicle.rows[0].availability_status,
      },
    };

    return {
      status: "returned",
      result: result,
    };
  }
};

// const getSingleBooking = async (id: string) => {
//   const result = pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
//   return result;
// };

// const deleteBookings = async (id: string) => {
//   const result = pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);
//   return result;
// };

export const bookingsServices = {
  createBooking,
  getBookings,
  updateBooking,
  // deleteBookings,
  // getSingleBooking,
};
