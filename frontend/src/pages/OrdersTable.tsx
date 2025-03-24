import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Columns, Table } from '../components/Table';
import { OrdersAPI } from '../api/routers/orders';
import { OrderBase } from '@lance/shared/models/order';
import { useAppSelector } from '../redux/hooks';

export const OrdersTablePage = () => {
  const params = useParams();
  const [data, setData] = useState<OrderBase[]>([]);
  const { names } = useAppSelector((state) => state.clientSlice);

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
    is_completed: {
      label: 'Completed?',
      render: (order) => <p>{order.is_completed ? '+' : '-'}</p>,
    },
    client_id: {
      label: 'Client',
      render: (order) => (
        <Link to={{ pathname: `/client/${order.client_id}` }}>
          {names[order.client_id.toString()]}
        </Link>
      ),
    },
  };

  const fetchData = async (page: number) => {
    try {
      if (page) {
        const response = await OrdersAPI.getPaginated({ page, perPage: 5 });

        if (response.data.data) {
          setData(response.data.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const asNumber = Number(params.page);
    if (asNumber) {
      fetchData(asNumber);
    }
  }, [params]);

  if (!data) return <p>No data</p>;

  return <Table data={data} columns={cols} />;
};
