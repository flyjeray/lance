import { StoryObj } from '@storybook/react';
import { Select } from '.';

export default {
  component: Select,
  title: 'Atoms/Select',
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Select>;

const generateArray = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    label: `Value ${i + 1}`,
    key: `${i + 1}`,
  }));
};

export const Component: Story = {
  args: {
    items: generateArray(10),
    onChange: () => {},
    placeholder: 'Placeholder',
  },
  argTypes: {
    onChange: {
      table: {
        disable: true,
      },
    },
  },
};
