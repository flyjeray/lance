import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Client } from '@lance/shared/models/client';
import { ClientsAPI } from '../api/routers/clients';
import { OrderBase } from '@lance/shared/models/order';

export const ClientPage = () => {
  const params = useParams();
  const [data, setData] = useState<Client | null>(null);
  const [orders, setOrders] = useState<OrderBase[]>([]);

  const fetchData = async (id: string) => {
    try {
      if (id) {
        const response = await ClientsAPI.getSingle({ id });

        if (response.data.data) {
          setData(response.data.data);
        }

        const orders = await ClientsAPI.getOrders({
          id,
          page: '1',
          perPage: '10',
        });

        if (orders.data.data) {
          setOrders(orders.data.data);
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

  return (
    <p>
      {data.name}
      {orders.length === 0 && <p>No orders</p>}
      <ul>
        {orders.map((order) => (
          <li>
            <Link
              to={{
                pathname: `/order/${order._id}`,
              }}
            >
              {order.title}
            </Link>
          </li>
        ))}
      </ul>
    </p>
  );
};
