const permTab = {
    '/all': {
        'GET': ['readOrder','all']
    },
    '/:orderID': {
        'GET': ['readOrder','all']
    },
    '/deliveryMan/:deliveryManID': {
        'GET': ['readOrder','all']
    },
    '//deliveryMan/:deliveryManID/pending': {
        'GET': ['readOrder','all']
    },
    '/': {
        'POST': ['addOrder','all']
    },
    '/:orderID/status': {
        'PUT': ['addOrder','all']
    },
    '/:orderID/deliveryManID': {
        'PUT': ['updateSatusOrder','all']
    },
    '/:orderID': {
        'DELETE': ['deleteOrder','all']
    }
};

module.exports = { permTab};