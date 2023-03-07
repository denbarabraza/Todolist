import React from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { InputItemForm } from '../common/components/InputItemForm';

export default {
  title: 'TODO/InputItemForm',
  component: InputItemForm,

  argTypes: {
    callback: { description: 'Enter value' },
  },
} as ComponentMeta<typeof InputItemForm>;

const Template: ComponentStory<typeof InputItemForm> = args => (
  <InputItemForm {...args} />
);

export const InputItemFormStory = Template.bind({});

InputItemFormStory.args = {
  callback: action('Input value'),
};
