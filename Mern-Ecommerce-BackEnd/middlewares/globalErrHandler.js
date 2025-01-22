export const globalErrHandler = (err, req, res,next) =>{
    // stack
    // message
    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode : 500;
    const message =err?.message

    res.status(statusCode).json({
        stack,
        message
    })

}

export const notFound= (req,res,next) => {
    const err = new Error(`Route ${req.originUrl} not found`)
    // Next Funtion Goes to next middleware funtion follow the sequences here next middleware is globalErrHandler(Look at app.js)
    next(err)
}