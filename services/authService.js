import Account from "../models/account.js";
import response from "../utils/response.js";
import bcrypt from "bcrypt";
import date from "date-and-time";
import jsonwebtoken from "jsonwebtoken";

const jwt = {
    validation(token = null) {
        if (!token) {
            return {
                status: false,
                error: 'Token is empty'
            };
        };

        return new Promise((resolve, reject) => {
                jsonwebtoken.verify(token, process.env.JWT_KEY, (error, decoded) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(decoded);
                    return;
                });
            })
            .then(data => {
                return {
                    status: true,
                    data,
                };
            })
            .catch(error => {
                return {
                    status: false,
                    error,
                };
            });
    },

    sign(payload, options = { algorithm: 'HS256', expiresIn: '30m' }) {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(payload, process.env.JWT_KEY, options, (err, token) => {
                if (err) {
                    reject(false);
                    return;
                }

                resolve(token);
                return;
            });
        });
    },
};

const tokenValidation = async function (token) {
	const validity = await jwt.validation(token);

	if (!validity.status) {
		return validity;
	}

	return validity;
};

class authService {
    static levelAdminChecker(req, res, next) {
        try {
            if (!req.decoded.l || req.decoded.l != 1) {
                throw {
                    message: "User tidak mempunyai hak akses!"
                };
            } else {
                next();
            }
        } catch (error) {
            return response(res, 400, "error", error);
        }
    }

    static async sessionChecker(req, res, next) {
		try {
            if (!req.headers.authorization) {
                throw {
                    message: "Please insert token!"
                };
            }

            const authorization = req.headers.authorization.split(' ');
            if (authorization[0].toLowerCase() == 'bearer' && authorization[1]) {
                const isValid = await tokenValidation(authorization[1]);

                if (isValid.status) {
                    req.decoded = isValid.data;
                    next()
                    return true;
                } else {
                    throw isValid;
                }
            }
		} catch (error) {
            return response(res, 400, "error", error)
        }
	}
    
    static async login(req, res) {
        try {
            const [account] = await Account.login(req.body.email);

            if (account.length <= 0) {
                throw {
                    message: "Email tidak ditemukan!"
                }
            }

            const check_password = await bcrypt.compare(req.body.password, account[0].account_password)

            if (!check_password) {
                throw {
                    message: "Password salah!"
                }
            }

            const expiresAt = date.format(new Date(Date.now() + process.env.JWT_EXPIREDS * 1), 'YYYY-MM-DD HH:mm:ss.SSS');

			const payload = {
                u: account[0].account_username,
                n: account[0].account_name,
                e: account[0].account_email,
                l: account[0].account_level,
                t: expiresAt
            };

			const token = await jwt.sign(payload, { expiresIn: process.env.JWT_EXPIREDS });
    
            return response(res, 200, "success", {
                token,
                expired_at: expiresAt
            })
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async register(req, res) {
        try {
            const body_send = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10),
            }

            const [account] = await Account.register(body_send);
        
            const tmp = {
                id: account.insertId 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async detailUser(req, res) {
        try {
            const [account] = await Account.userDetail(req.decoded.u);
    
            return response(res, 200, "success", account[0])
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async updateUser(req, res) {
        try {
            const body_send = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                address: req.body.address,
                username: req.decoded.u
            }

            const [account] = await Account.updateUser(body_send);
        
            const tmp = {
                change_row: account.changedRows 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }
}

export default authService