import dbPool from "../utils/db.js";

class Cart {
    static getAll(data = {}){
        const sql ={
            query: `
                SELECT 
                    crt.cart_id id,
                    crt.product_id,
                    prod.product_name,
                    prod.product_price,
                    crt.account_id,
                    crt.amount_product,
                    crt.total_price
                FROM cart crt
                LEFT JOIN product prod ON crt.product_id = prod.product_id
                WHERE 1`,
            params: []
        }

        if (data.account_id) {
            sql.query += ` AND account_id = ?`;
            sql.params.push(data.account_id);
        }

        if (data.product_id) {
            sql.query += ` AND product_id = ?`;
            sql.params.push(data.product_id);
        }

        if (data.id) {
            sql.query += ` AND cart_id = ?`;
            sql.params.push(data.id);
        }

        return dbPool.query(sql.query, sql.params);
    }

    static createCart(data){
        const sql = {
            query: `INSERT INTO cart (product_id, account_id, amount_product, total_price) VALUE(?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE amount_product = VALUES(amount_product), total_price = VALUES(total_price)`,
            params: [data.product_id, data.account_id, data.amount, data.price],
        };

        return dbPool.query(sql.query, sql.params);
    }

    static deleteCart(id){
        const sql = {
            query: `DELETE FROM cart WHERE cart_id = ?`,
            params: [id],
        };

        return dbPool.query(sql.query, sql.params);
    }
}

export default Cart;