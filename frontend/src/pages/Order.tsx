import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { OrdersAPI } from '../api/routers/orders';
import { ExtendedOrder } from '@lance/shared/models/api/orders';

export const OrderPage = () => {
  const params = useParams();
  const [data, setData] = useState<ExtendedOrder | null>(null);

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

  return (
    <div>
      <p>{data.title}</p>
      <Link
        to={{
          pathname: `/client/${data.client_id}`,
        }}
      >
        <p>{data.client_data.name}</p>
      </Link>
    </div>
  );
};
