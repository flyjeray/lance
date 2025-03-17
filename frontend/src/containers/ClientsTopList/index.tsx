import { useEffect, useState } from 'react';
import { List } from '../../components';
import { ListItemEntry } from '../../components/List/Item';
import { ClientsAPI } from '../../api/routers/clients';

export const ClientsTopList = () => {
  const [data, setData] = useState<ListItemEntry[]>([]);

  const fetchData = async () => {
    try {
      const response = await ClientsAPI.get({ page: 1, perPage: 5 });
      const clients = response.data.data;

      if (clients) {
        setData(clients.map((client) => ({ title: client.name })));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <List entries={data} />;
};
