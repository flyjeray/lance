import { StoryObj } from '@storybook/react';
import { List } from '.';
import { BrowserRouter } from 'react-router';

export default {
  component: List,
  title: 'Molecules/List',
  tags: ['autodocs'],
};

type Story = StoryObj<typeof List>;

export const Component: Story = {
  args: {
    entries: [
      { title: 'List Item #1 ' },
      { title: 'List Item #2' },
      { title: 'Another List Item' },
    ],
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
