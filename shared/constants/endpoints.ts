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
      me: '/me',
    },
  },
  orders: {
    prefix: '/orders',
    endpoints: {
      create: '/create',
      getPaginated: '/paginated',
      getSingle: '/single',
    },
  },
  clients: {
    prefix: '/clients',
    endpoints: {
      create: '/create',
      getPaginated: '/paginated',
      getSingle: '/single',
      nameDictionary: '/dictionary',
    },
  },
} as const satisfies APIStructure;

export default APIEndpoints;
