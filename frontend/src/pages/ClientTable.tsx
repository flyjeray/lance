import { Client } from '@lance/shared/models/client';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ClientsAPI } from '../api/routers/clients';
import { Columns, Table } from '../components/Table';

const cols: Columns<Client> = {
  name: {
    label: "Client's Name",
    render: (client) => (
      <Link
        to={{
          pathname: `/client/${client._id}`,
        }}
      >
        {client.name}
      </Link>
    ),
  },
  description: {
    label: "Client's Description",
    render: (client) => <p>{client.description}</p>,
  },
};

export const ClientTablePage = () => {
  const params = useParams();
  const [data, setData] = useState<Client[]>([]);

  const fetchData = async (page: number) => {
    try {
      if (page) {
        const response = await ClientsAPI.getPaginated({ page, perPage: 5 });

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
