import Product from "../models/product.js";
import response from "../utils/response.js";

class productService {   
    static async getProduct(req, res) {
        try {
            const [product] = await Product.getAll({ id: req.params.id })

            if (product.length <= 0) {
                throw {
                    message: "Data tidak ditemukan!"
                }
            }

            return response(res, 200, "success", req.params.id ? product[0]:product)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async createProduct(req, res) {
        try {
            const [product] = await Product.createProduct(req.body);
            
            const tmp = {
                id: product.insertId 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async updateProduct(req, res) {
        try {
            const [product] = await Product.updateProduct({ ...req.body, id: req.params.id });
            
            const tmp = {
                change_row: product.changedRows 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async deleteProduct(req, res) {
        try {
            const [product] = await Product.deleteProduct(req.params.id);
            
            const tmp = {
                affected_row: product.affectedRows 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }
}

export default productService