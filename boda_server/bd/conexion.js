import mysql from "mysql";
import configbd from "../config/configbd.json" with { type: "json" };

const pool = mysql.createPool(configbd);

export default pool;
