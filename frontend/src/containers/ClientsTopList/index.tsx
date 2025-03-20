import { useEffect, useState } from 'react';
import { List } from '../../components';
import { ListItemEntry } from '../../components/List/Item';
import { ClientsAPI } from '../../api/routers/clients';
import { Link } from 'react-router';

export const ClientsTopList = () => {
  const [data, setData] = useState<ListItemEntry[]>([]);

  const fetchData = async () => {
    try {
      const response = await ClientsAPI.getPaginated({ page: 1, perPage: 5 });
      const clients = response.data.data;

      if (clients) {
        setData(
          clients.map((client) => ({
            title: client.name,
            link: `/client/${client._id}`,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <List entries={data} />
      <Link
        to={{
          pathname: '/clients/1',
        }}
      >
        <p>More</p>
      </Link>
    </div>
  );
};
