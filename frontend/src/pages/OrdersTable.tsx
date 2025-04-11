import { Link, useNavigate, useParams } from 'react-router';
import { Columns, Pagination, Table } from '../components';
import { OrderBase } from '@lance/shared/models/order';
import { useClientNameDictionary, useOrderList } from '../hooks/query';

export const OrdersTablePage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const { data: clients } = useClientNameDictionary();
  const { data: orders } = useOrderList({ page, perPage: '5' });

  const cols: Columns<OrderBase> = {
    title: {
      label: 'Order Title',
      render: (order) => (
        <Link
          to={{
            pathname: `/order/${order._id}`,
          }}
        >
          {order.title}
        </Link>
      ),
    },
    description: {
      label: "Order's Description",
      render: (order) => <p>{order.description}</p>,
    },
    price: {
      label: 'Price',
      render: (order) => <p>${order.price}</p>,
    },
    is_completed: {
      label: 'Completed?',
      render: (order) => <p>{order.is_completed ? '+' : '-'}</p>,
    },
    client_id: {
      label: 'Client',
      render: (order) => (
        <Link to={{ pathname: `/client/${order.client_id}` }}>
          {clients?.data[order.client_id.toString()]}
        </Link>
      ),
    },
  };

  if (!orders) return <p>No data</p>;

  return (
    <>
      <Table data={orders.data} columns={cols} />

      {orders.pagination && (
        <Pagination
          page={orders.pagination.page}
          lastPage={orders.pagination.totalPages}
          delta={2}
          onPageChange={(page) => {
            navigate(`/clients/${page}`);
          }}
        />
      )}
    </>
  );
};
