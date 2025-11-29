import sqlite3 from "sqlite3";

export async function openDB(){
    return open({
        filename: './database/database.db',
        driver: sqlite3.Database
    });
}