import { List } from '../../components';
import { ListItemEntry } from '../../components/List/Item';
import { Link } from 'react-router';
import { useOrderList } from '../../hooks/query';
import { useMemo } from 'react';

export const OrdersTopList = () => {
  const { data: ordersResponse } = useOrderList({ page: '1', perPage: '5' });

  const listEntries: ListItemEntry[] = useMemo(() => {
    return (
      ordersResponse?.data.map((order) => ({
        title: order.title,
        link: `/order/${order._id}`,
      })) || []
    );
  }, [ordersResponse]);

  return (
    <div>
      <List entries={listEntries} />

      <Link
        to={{
          pathname: '/orders/1',
        }}
      >
        <p>More</p>
      </Link>
    </div>
  );
};
