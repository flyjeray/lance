import {
  ClientCreateForm,
  ClientsTopList,
  OrderCreateForm,
  OrdersTopList,
} from '../containers';

export const DashboardPage = () => {
  return (
    <div>
      <OrdersTopList />
      <ClientsTopList />
      <OrderCreateForm />
      <ClientCreateForm />
    </div>
  );
};
