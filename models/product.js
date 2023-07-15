import dbPool from "../utils/db.js";

class Product {
    static getAll(data = {}){
        const sql ={
            query: `
                SELECT 
                    product_id id,
                    product_name name,
                    product_description description,
                    product_color color,
                    product_size size,
                    product_price price,
                    product_category category 
                FROM product
                WHERE 1`,
            params: []
        }

        if (data.id) {
            sql.query += ` AND product_id = ?`;
            sql.params.push(data.id);
        }

        return dbPool.query(sql.query, sql.params);
    }

    static createProduct(data){
        const sql = {
            query: `INSERT INTO product (product_name, product_description, product_color, product_size, product_price, product_category) VALUE(?, ?, ?, ?, ?, ?)`,
            params: [data.name, data.description, data.color, data.size, data.price, data.category],
        };

        return dbPool.query(sql.query, sql.params);
    }

    static updateProduct(data){
        const sql = {
            query: `UPDATE product SET product_name = ?, product_description = ?, product_color = ?, product_size = ?, product_price = ?, product_category = ? WHERE product_id = ?`,
            params: [data.name, data.description, data.color, data.size, data.price, data.category, data.id],
        };

        return dbPool.query(sql.query, sql.params);
    }

    static deleteProduct(id){
        const sql = {
            query: `DELETE FROM product WHERE product_id = ?`,
            params: [id],
        };

        return dbPool.query(sql.query, sql.params);
    }
}

export default Product;