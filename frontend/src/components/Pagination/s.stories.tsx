import { StoryObj } from '@storybook/react';
import { Pagination } from '.';

export default {
  component: Pagination,
  title: 'Molecules/Pagination',
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Pagination>;

export const Component: Story = {
  args: {
    page: 5,
    lastPage: 10,
  },
};
