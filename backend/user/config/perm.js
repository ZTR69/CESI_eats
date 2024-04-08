// Tab with all permissions associate to url

const permTab = {
    '/api/users/register': {
        'POST': ['write']
    },
    '/api/users/login': {
        'POST': ['write'],
    },
    '/api/users/getMe': {
        'GET': ['read']
    },
    '/api/users/update': {
        'PUT': ['write']
    },
    '/api/users/delete': {
        'DELETE': ['delete']
    }
};

module.exports = { permTab };