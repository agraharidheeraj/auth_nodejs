const responde = (res,statusCode,message,data=null) =>{
    return res.status(statusCode).json({
        status: statusCode=== 200 || statusCode===201 ? 'success' : 'error',
        message,
        data
    })
}
module.exports = {responde}