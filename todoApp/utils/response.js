function SuccessResponse(req,res, data, message = req.t('successResponse'), code = 200) {
    return res.status(code).json({
        code: code,
        status: req.t('success'),
        message: message,
        data,
    });
}
function ErrorResponse(req,res, data = null, message = req.t('errorResponse'), code = 400) {
    return res.status(code).json({
        code: code,
        status: req.t('error') ,
        message: message,
        data,
    });
}


module.exports = { SuccessResponse, ErrorResponse }