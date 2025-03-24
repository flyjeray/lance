import { StoryObj } from '@storybook/react';
import { Columns, Table } from '.';

export default {
  component: Table,
  title: 'Atoms/Table',
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Table>;

type Entry = {
  first_name: string;
  last_name: string;
};

const entries: Entry[] = [
  {
    first_name: 'Name',
    last_name: 'Surname',
  },
  {
    first_name: 'Name2',
    last_name: 'Surname2',
  },
  {
    first_name: 'Name3',
    last_name: 'Surname3',
  },
  {
    first_name: 'Name4',
    last_name: 'Surname4',
  },
];

const columns: Columns<Entry> = {
  first_name: {
    label: 'FN',
    render: (entry) => <p>FN: {entry.first_name}</p>,
  },
  last_name: {
    label: 'LN',
    render: (entry) => <p>LN: {entry.last_name}</p>,
  },
};

export const Component: Story = {
  args: {
    data: entries,
    columns,
  },
};
