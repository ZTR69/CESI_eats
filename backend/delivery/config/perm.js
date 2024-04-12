const permTab = {
    '/deliveryMan/cooking': {
        'GET': ['readDelivery','all']
    },
    '/all': {
        'GET': ['readDelivery','all']
    },
    '/delivery': {
        'GET': ['readDelivery','all']
    },
    '/deliveryMan/': {
        'GET': ['readDelivery','all']
    },
    '/add': {
        'POST': ['addDelivery','all']
    },
    '/status': {
        'PUT': ['updateSatusDelivery','all']
    },
    '/deliveryManID': {
        'PUT': ['updateSatusOrder','all']
    },
    '/delivery': {
        'DELETE': ['deleteOrder','all']
    }
};

module.exports = { permTab };