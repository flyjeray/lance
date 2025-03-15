import { StoryObj } from '@storybook/react';
import { ListItem } from '.';
import { BrowserRouter } from 'react-router';

export default {
  component: ListItem,
  title: 'Molecules/List/Item',
  tags: ['autodocs'],
};

type Story = StoryObj<typeof ListItem>;

export const Component: Story = {
  args: {
    title: 'List Item',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
