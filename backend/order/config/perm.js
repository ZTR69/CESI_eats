const permTab = {
    '/all': {
        'GET': ['readOrder','all']
    },
    '/': {
        'GET': ['readOrder','all']
    },
    '/restaurant/': {
        'GET': ['readOrder','all']
    },
    '/restaurant/pending': {
        'GET': ['readOrder','all']
    },
    '/': {
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
    '/': {
        'DELETE': ['deleteOrder','all']
    }
};

module.exports = { permTab};