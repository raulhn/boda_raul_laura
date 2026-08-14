import mysql from "mysql2/promise";
import configbd from "../config/configbd.js";

const pool = mysql.createPool(configbd);

export default pool;
