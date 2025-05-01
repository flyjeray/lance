type RouterStructure = {
  prefix: `/${string}`;
  endpoints: Record<string, `/${string}`>;
};

type APIStructure = Record<string, RouterStructure>;

const APIEndpoints = {
  auth: {
    prefix: '/auth',
    endpoints: {
      login: '/login',
      logout: '/logout',
      me: '/me',
    },
  },
  orders: {
    prefix: '/orders',
    endpoints: {
      create: '/create',
      getPaginated: '/paginated',
      getSingle: '/single',
      changeClient: '/change_client',
      changeStatus: '/change_status',
      update: '/update',
      delete: '/delete',
    },
  },
  clients: {
    prefix: '/clients',
    endpoints: {
      create: '/create',
      getPaginated: '/paginated',
      getSingle: '/single',
      nameDictionary: '/dictionary',
      getClientOrders: '/orders',
      delete: '/delete',
      update: '/update',
    },
  },
  statuses: {
    prefix: '/statuses',
    endpoints: {
      create: '/create',
      get: '/get',
    },
  },
} as const satisfies APIStructure;

export default APIEndpoints;
