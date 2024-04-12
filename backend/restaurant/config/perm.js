// Tab with all permissions associate to url

const permTab = {
  '/get': {
      'GET': ['read_all_restaurant', 'all']
  },
  '/getById': {
      'GET': ['read_restaurant', 'all']
  },
  '/create': {
      'POST': ['create_restaurant', 'all']
  },
  '/update': {
      'PUT': ['update_restaurant', 'all']
  },
  '/delete': {
      'DELETE': ['delete_restaurant', 'all']
  },
  '/getMenu': {
      'GET': ['read_all_menu', 'all']
  },
  '/getByIdMenu': {
      'GET': ['read_menu', 'all']
  },
  '/createMenu': {
      'POST': ['create_menu', 'all']
  },
  '/updateMenu': {
      'PUT': ['update_menu', 'all']
  },
  '/deleteMenu': {
      'DELETE': ['delete_menu', 'all']
  },
};

module.exports = { permTab };