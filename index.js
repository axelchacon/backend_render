import express from "express";
import pg from "pg";
import { config } from "dotenv";
config();
const app = express();

/////coneccion a la base de datos
const pool = new pg.Pool({
	connectionString: process.env.DATABASE_URL_EXTERNA,
	//ssl: true,
});
app.get("/", (req, res) => {
	res.send("Hola axel rende");
});

/////ceamos una ruta donde agrgamos nuestra base de datos para consultar

app.get("/ping", async (req, res) => {
	const result = await pool.query("SELECT NOW()");
	return res.json(result.rows[0]);
});
console.log(process.env.DATABASE_URL_EXTERNA);

app.listen(3000);
console.log("server on port", 3000);
