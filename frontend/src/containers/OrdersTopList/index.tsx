import { useEffect, useState } from 'react';
import { List } from '../../components';
import { ListItemEntry } from '../../components/List/Item';
import { OrdersAPI } from '../../api/routers/orders';
import { Link } from 'react-router';

export const OrdersTopList = () => {
  const [data, setData] = useState<ListItemEntry[]>([]);

  const fetchData = async () => {
    try {
      const response = await OrdersAPI.getPaginated({ page: 1, perPage: 5 });
      const orders = response.data.data;

      if (orders) {
        setData(
          orders.map((order) => ({
            title: order.title,
            link: `/order/${order._id}`,
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
          pathname: '/orders/1',
        }}
      >
        <p>More</p>
      </Link>
    </div>
  );
};
