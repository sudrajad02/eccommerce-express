const response = (res, code, message, data) => {
    return res.json({
        code: code,
        message: message, 
        data: code == 200 ? data:undefined,
        error: code != 200 ? data:undefined
    })
}

export default response