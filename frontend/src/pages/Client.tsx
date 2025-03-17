import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Client } from '@lance/shared/models/client';
import { ClientsAPI } from '../api/routers/clients';

export const ClientPage = () => {
  const params = useParams();
  const [data, setData] = useState<Client | null>(null);

  const fetchData = async (id: string) => {
    try {
      if (id) {
        const response = await ClientsAPI.getSingle({ id });

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

  return <p>{data.name}</p>;
};
