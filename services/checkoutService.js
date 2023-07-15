import Checkout from "../models/checkout.js";
import Cart from "../models/cart.js";
import response from "../utils/response.js";

class checkoutService {   
    static async getCheckout(req, res) {
        try {
            const [checkout] = await Checkout.getAll({ account_id: req.params.account_id })

            if (checkout.length <= 0) {
                throw {
                    message: "Data tidak ditemukan!"
                }
            }

            const tmp = []

            for (const item of checkout) {
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

    static async createCheckout(req, res) {
        try {
            const [check_cart] = await Cart.getAll({ id: req.body.cart_id });

            if (check_cart.length <= 0) {
                throw {
                    message: "Data tidak ditemukan!"
                }
            }

            if (check_cart[0].account_id != req.body.account_id) {
                throw {
                    message: "User tidak sesuai!"
                }
            }

            const [checkout] = await Checkout.createCheckout(req.body);

            const tmp = {
                id: checkout.insertId 
            }

            const [delete_cart] = await Cart.deleteCart(req.body.cart_id)
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async deleteCheckout(req, res) {
        try {
            const [checkout] = await Checkout.deleteCheckout(req.params.id);
            
            const tmp = {
                affected_row: checkout.affectedRows 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }
}

export default checkoutService