import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import LanguageSelector from './index';
import { fn } from '@storybook/test';

export default {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
} as Meta;

const Template: StoryFn = (args) => <LanguageSelector {...args} />;

export const Default = Template.bind({});

Default.args = {
    lng: 'en',
    handleLangChange: fn()
};

