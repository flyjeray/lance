import { StoryObj } from '@storybook/react';
import { Button } from '.';

export default {
  component: Button,
  title: 'Atoms/Button',
  tags: ['autodocs'],
};

type Story = StoryObj<typeof Button>;

export const Component: Story = {
  args: {},
};
