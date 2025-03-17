import { Order } from '@lance/shared/models/order';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { OrdersAPI } from '../api/routers/orders';

export const OrderPage = () => {
  const params = useParams();
  const [data, setData] = useState<Order | null>(null);

  const fetchData = async (id: string) => {
    try {
      if (id) {
        const response = await OrdersAPI.getSingle({ id });

        if (response.data.data) {
          setData(response.data.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchData(params.id);
    }
  }, [params]);

  if (!data) return <p>No data</p>;

  return <p>{data.title}</p>;
};
