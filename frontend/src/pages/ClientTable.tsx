import { Client } from '@lance/shared/models/client';
import { Link, useNavigate, useParams } from 'react-router';
import { Columns, Pagination, Table } from '../components';
import { useClientList } from '../hooks/query';

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
  const { page } = useParams();
  const navigate = useNavigate();
  const { data: clientList } = useClientList({
    page,
    perPage: '5',
  });

  if (!clientList) return <p>No data</p>;

  return (
    <>
      <Table data={clientList.data} columns={cols} />

      {clientList.pagination && (
        <Pagination
          page={clientList.pagination.page}
          lastPage={clientList.pagination.totalPages}
          delta={2}
          onPageChange={(page) => {
            navigate(`/clients/${page}`);
          }}
        />
      )}
    </>
  );
};
