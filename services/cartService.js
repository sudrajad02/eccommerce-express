import Cart from "../models/cart.js";
import response from "../utils/response.js";

class cartService {   
    static async getCart(req, res) {
        try {
            const [cart] = await Cart.getAll({ account_id: req.params.account_id })

            if (cart.length <= 0) {
                throw {
                    message: "Data tidak ditemukan!"
                }
            }

            const tmp = []

            for (const item of cart) {
                tmp.push({
                    id: item.id,
                    product: {
                        id: item.product_id,
                        name: item.product_name,
                        price: item.product_price,
                    },
                    amount: item.amount_product,
                    total_price: item.total_price
                })
            }

            return response(res, 200, "success", req.params.id ? tmp[0]:tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async createCart(req, res) {
        try {
            let body_send
            const [list_cart] = await Cart.getAll(req.body);

            if (list_cart.length > 0) {
                body_send = {
                    cart_id: req.body.cart_id,
                    account_id: req.body.account_id,
                    amount: req.body.amount + list_cart[0].amount_cart,
                    price: (req.body.price * req.body.amount) + list_cart[0].total_price,
                }
            } else {
                body_send = req.body
            }
            
            const [cart] = await Cart.createCart(body_send);

            const tmp = {
                id: cart.insertId 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async deleteCart(req, res) {
        try {
            const [cart] = await Cart.deleteCart(req.params.id);
            
            const tmp = {
                affected_row: cart.affectedRows 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }
}

export default cartService