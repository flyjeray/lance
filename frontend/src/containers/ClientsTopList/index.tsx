import { List } from '../../components';
import { Link } from 'react-router';
import { ListItemEntry } from '../../components/List/Item';
import { useClientList } from '../../hooks/query';
import { useMemo } from 'react';

export const ClientsTopList = () => {
  const { data: clientsResponse } = useClientList({ page: '1', perPage: '5' });

  const listEntries: ListItemEntry[] = useMemo(() => {
    return (
      clientsResponse?.data.map((client) => ({
        title: client.name,
        link: `/client/${client._id}`,
      })) || []
    );
  }, [clientsResponse]);

  return (
    <div>
      <List entries={listEntries} />
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
