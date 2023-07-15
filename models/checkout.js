import dbPool from "../utils/db.js";

class Checkout {
    static getAll(data = {}){
        const sql ={
            query: `
                SELECT 
                    co.checkout_account_id account_id,
                    co.checkout_address address,
                    co.checkout_product_id product_id,
                    co.checkout_amount_product amount_product,
                    co.checkout_total_price total_price
                FROM checkout co
                LEFT JOIN product prod ON co.checkout_product_id = prod.product_id
                WHERE 1`,
            params: []
        }

        if (data.account_id) {
            sql.query += ` AND co.checkout_account_id = ?`;
            sql.params.push(data.account_id);
        }

        if (data.product_id) {
            sql.query += ` AND product_id = ?`;
            sql.params.push(data.product_id);
        }

        return dbPool.query(sql.query, sql.params);
    }

    static createCheckout(data){
        const sql = {
            query: `INSERT INTO checkout (checkout_account_id, checkout_address, checkout_product_id, checkout_amount_product, checkout_total_price) VALUE(?, ?, ?, ?, ?)`,
            params: [data.account_id, data.address, data.product_id, data.amount_product, data.total_price],
        };

        return dbPool.query(sql.query, sql.params);
    }

    static deleteCheckout(id){
        const sql = {
            query: `DELETE FROM checkout WHERE checkout_id = ?`,
            params: [id],
        };

        return dbPool.query(sql.query, sql.params);
    }
}

export default Checkout;