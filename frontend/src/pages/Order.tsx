import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { OrdersAPI } from '../api/routers/orders';
import { ExtendedOrder } from '@lance/shared/models/api/orders';
import { Select, SelectItem } from '../components';
import { useAppSelector } from '../redux/hooks';

export const OrderPage = () => {
  const params = useParams();
  const { names: clients } = useAppSelector((state) => state.clientSlice);
  const [data, setData] = useState<ExtendedOrder | null>(null);

  const clientSelectItems = useMemo((): SelectItem[] => {
    return Object.entries(clients).map(([id, name]) => ({
      label: name,
      key: id,
    }));
  }, [clients]);

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

  const handleChangeClient = async (orderID: string, newClientID: string) => {
    try {
      if (orderID) {
        OrdersAPI.changeClient({ orderID, newClientID });
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
      <Select
        label="Change client"
        defaultValueKey={data.client_id.toString()}
        items={clientSelectItems}
        onChange={(client) =>
          handleChangeClient(data._id.toString(), client.key)
        }
      />
    </div>
  );
};
