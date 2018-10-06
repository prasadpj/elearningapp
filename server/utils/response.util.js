'use strict';

function responseError(message, err) {
    console.log(err);
    return {
        status: false,
        message: message || 'Something went wrong!',
        error: err,
        data: null
    };
}

function responseSuccess(data) {
    return {
        status: true,
        message: 'success',
        data: data
    };
}

module.exports = {
    responseError: responseError,
    responseSuccess: responseSuccess
};