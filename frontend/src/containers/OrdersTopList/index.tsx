import { useEffect, useState } from 'react';
import { List } from '../../components';
import { ListItemEntry } from '../../components/List/Item';
import { OrdersAPI } from '../../api/routers/orders';

export const OrdersTopList = () => {
  const [data, setData] = useState<ListItemEntry[]>([]);

  const fetchData = async () => {
    try {
      const response = await OrdersAPI.get({ page: 1, perPage: 5 });
      const orders = response.data.data;

      if (orders) {
        setData(orders.map((order) => ({ title: order.title })));
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
