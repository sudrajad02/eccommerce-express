import dbPool from "../utils/db.js";

class Account {
    static login(email){
        const sql = {
            query: `
                SELECT 
                    account_email,
                    account_username,
                    account_password,
                    account_name,
                    account_level
                FROM account
                WHERE account_email = ?
                OR account_username = ?`,
            params: [email, email]
        };

        return dbPool.query(sql.query, sql.params);
    }

    static register(data){
        const sql = {
            query: `INSERT INTO account (account_name, account_email, account_username, account_password) VALUE(?, ?, ?, ?)`,
            params: [data.name, data.email, data.username, data.password]
        };

        return dbPool.query(sql.query, sql.params);
    }

    static updateUser(data){
        const sql = {
            query: `UPDATE account SET account_name = ?, account_email = ?, account_password = ?, account_address = ? WHERE account_username = ?`,
            params: [data.name, data.email, data.password, data.address, data.username]
        };

        return dbPool.query(sql.query, sql.params);
    }

    static userDetail(username){
        const sql = {
            query: `
                SELECT 
                    account_email,
                    account_username,
                    account_name,
                    account_level,
                    account_address
                FROM account
                WHERE account_username = ?`,
            params: [username]
        };

        return dbPool.query(sql.query, sql.params);
    }
}

export default Account;