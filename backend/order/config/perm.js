const permTab = {
    '/all': {
        'GET': ['readOrder','all']
    },
    '/order': {
        'GET': ['readOrder','all']
    },
    '/restaurant/': {
        'GET': ['readOrder','all']
    },
    '/restaurant/pending': {
        'GET': ['readOrder','all']
    },
    '/add': {
        'POST': ['addOrder','all']
    },
    '/item': {
        'PUT': ['addOrder','all']
    },
    '/status': {
        'PUT': ['updateSatusOrder','all']
    },
    '/item': {
        'DELETE': ['deleteOrder','all']
    },
    '/order': {
        'DELETE': ['deleteOrder','all']
    }
};

module.exports = { permTab};