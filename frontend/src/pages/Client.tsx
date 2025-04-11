import { Link, useParams } from 'react-router';
import { useClient, useClientOrders } from '../hooks/query';

export const ClientPage = () => {
  const { id } = useParams();
  const { data: client } = useClient({ id: id as string });
  const { data: orders } = useClientOrders({
    id: id as string,
    page: '1',
    perPage: '10',
  });

  if (!client) return <p>No data</p>;

  return (
    <p>
      {client.data.name}
      {orders?.data.length === 0 && <p>No orders</p>}
      <ul>
        {orders?.data.map((order) => (
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
