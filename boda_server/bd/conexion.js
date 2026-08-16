import mysql from "mysql2/promise";
import configbd from "../config/configbd.json" with { type: "json" };

const pool = mysql.createPool(configbd);

export default pool;
