const permTab = {
    '/deliveryMan/cooking': {
        'GET': ['readDelivery','all']
    },
    '/all': {
        'GET': ['readDelivery','all']
    },
    '/': {
        'GET': ['readDelivery','all']
    },
    '/deliveryMan/': {
        'GET': ['readDelivery','all']
    },
    '/': {
        'POST': ['addDelivery','all']
    },
    '/status': {
        'PUT': ['updateSatusDelivery','all']
    },
    '/deliveryManID': {
        'PUT': ['updateSatusOrder','all']
    },
    '/': {
        'DELETE': ['deleteOrder','all']
    }
};

module.exports = { permTab };