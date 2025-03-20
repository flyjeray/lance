import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Columns, Table } from '../components/Table';
import { OrdersAPI } from '../api/routers/orders';
import { OrderBase } from '@lance/shared/models/order';

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
};

export const OrdersTablePage = () => {
  const params = useParams();
  const [data, setData] = useState<OrderBase[]>([]);

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
