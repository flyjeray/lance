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
    },
  },
} as const satisfies APIStructure;

export default APIEndpoints;
