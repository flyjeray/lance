import { Client } from '@lance/shared/models/client';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ClientsAPI } from '../api/routers/clients';
import { Columns, Pagination, Table } from '../components';
import { PaginationResponse } from '@lance/shared/models/api/general';

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
  const navigate = useNavigate();
  const [data, setData] = useState<Client[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse | null>(null);

  const fetchData = async (page: string) => {
    try {
      if (page) {
        const response = await ClientsAPI.getPaginated({ page, perPage: '5' });

        if (response.data.data) {
          setData(response.data.data);
          setPagination(response.data.pagination);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.page) {
      fetchData(params.page);
    }
  }, [params]);

  if (!data) return <p>No data</p>;

  return (
    <>
      <Table data={data} columns={cols} />

      {pagination && (
        <Pagination
          page={pagination.page}
          lastPage={pagination.totalPages}
          delta={2}
          onPageChange={(page) => {
            navigate(`/clients/${page}`);
          }}
        />
      )}
    </>
  );
};
