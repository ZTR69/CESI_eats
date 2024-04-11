const permTab = {
    '/all': {
        'GET': ['readDelivery','all']
    },
    '/:orderID': {
        'GET': ['readDelivery','all']
    },
    '/deliveryMan/:deliveryManID': {
        'GET': ['readDelivery','all']
    },
    '/deliveryMan/:deliveryManID/cooking': {
        'GET': ['readDelivery','all']
    },
    '/': {
        'POST': ['addDelivery','all']
    },
    '/:orderID/status': {
        'PUT': ['updateSatusDelivery','all']
    },
    '/:orderID/deliveryManID': {
        'PUT': ['updateSatusOrder','all']
    },
    '/:orderID': {
        'DELETE': ['deleteOrder','all']
    }
};

module.exports = { permTab};