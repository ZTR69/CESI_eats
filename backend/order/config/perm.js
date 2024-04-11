const permTab = {
    '/all': {
        'GET': ['readOrder','all']
    },
    '/:orderID': {
        'GET': ['readOrder','all']
    },
    '/restaurant/:restaurantID': {
        'GET': ['readOrder','all']
    },
    '/restaurant/:restaurantID/pending': {
        'GET': ['readOrder','all']
    },
    '/': {
        'POST': ['addOrder','all']
    },
    '/:orderID/item': {
        'PUT': ['addOrder','all']
    },
    '/:orderID/status': {
        'PUT': ['updateSatusOrder','all']
    },
    '/item/:orderID': {
        'DELETE': ['deleteOrder','all']
    },
    '/:orderID': {
        'DELETE': ['deleteOrder','all']
    }
};

module.exports = { permTab};