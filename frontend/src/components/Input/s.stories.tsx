import { StoryObj } from '@storybook/react';
import { Input } from '.';

export default {
  component: Input,
  title: 'Atoms/Input',
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Input>;

export const Component: Story = {
  args: {},
};
