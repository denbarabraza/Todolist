import React from 'react'

import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SuperEditbleSpan } from '../common/components/SuperEditbleSpan'

export default {
  title: 'TODO/SuperEditbleSpan',
  component: SuperEditbleSpan,
  argTypes: {
    callback: { description: 'Edit value' },
  },
} as ComponentMeta<typeof SuperEditbleSpan>

const Template: ComponentStory<typeof SuperEditbleSpan> = args => <SuperEditbleSpan {...args} />

export const SuperEditbleSpanStory = Template.bind({})

SuperEditbleSpanStory.args = {
  title: 'Click me and edit',
  callback: action('Edit title value'),
}
