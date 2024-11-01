import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "jmiatb",
    port: 5432,
});
db.connect();

export default db;

// Functions for database operations
export function addblog_to_db(data) {
    db.query("INSERT INTO blog (heading, content) VALUES ($1, $2)", [data.heading, data.content]);
}

export function retrieve_from_db() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM blog ORDER BY no ASC", (err, res) => {
            if (err) reject(err);
            else resolve(res.rows);
        });
    });
}

export function retrieve_noblogs_db() {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) FROM blog", (err, res) => {
            if (err) reject(err);
            else resolve(res.rows[0].count);
        });
    });
}

export function deleteblog_from_db(id) {
    db.query("DELETE FROM blog WHERE no = $1", [id], (err, res) => {
        if (err) console.error("Error executing query", err.stack);
        else console.log(`Row with ID ${id} deleted successfully.`);
    });
}

export function retrieve_singlerow_db(blogId) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM blog WHERE no = $1", [blogId], (err, res) => {
            if (err) reject(err);
            else resolve(res.rows[0]);
        });
    });
}

export function change_valueof_row_db(index, heading, content) {
    db.query("UPDATE blog SET heading = $1, content = $2 WHERE no = $3", [heading, content, index], (err, res) => {
        if (err) console.error("Error updating row", err.stack);
        else console.log(`Row with ID ${index} updated successfully.`);
    });
}
