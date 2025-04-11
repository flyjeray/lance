import { useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { Select, SelectItem } from '../components';
import {
  useChangeOrderClient,
  useClientNameDictionary,
  useOrder,
} from '../hooks/query';

export const OrderPage = () => {
  const { id } = useParams();
  const { data: clients } = useClientNameDictionary();
  const { data: order } = useOrder({ id: id as string });
  const { mutateAsync: changeClient } = useChangeOrderClient(id as string);

  const clientSelectItems = useMemo((): SelectItem[] => {
    if (!clients) return [];

    return Object.entries(clients.data).map(([id, name]) => ({
      label: name,
      key: id,
    }));
  }, [clients]);

  if (!order) return <p>No data</p>;

  return (
    <div>
      <p>{order.data.title}</p>
      <Link
        to={{
          pathname: `/client/${order.data.client_id}`,
        }}
      >
        <p>{clients?.data[order.data.client_id.toString()]}</p>
      </Link>
      <Select
        label="Change client"
        defaultValueKey={order.data.client_id.toString()}
        items={clientSelectItems}
        onChange={(client) =>
          changeClient({
            orderID: order.data._id.toString(),
            newClientID: client.key,
          })
        }
      />
    </div>
  );
};
