import type { Theme } from '@aws-amplify/ui-react'

const authTheme: Theme = {
  name: 'real-state-auth',
  tokens: {
    colors: {
      primary: {
        10: { value: '#fafafa' },
        20: { value: '#e5e5e5' },
        40: { value: '#a3a3a3' },
        60: { value: '#525252' },
        80: { value: '#171717' },
        90: { value: '#0a0a0a' },
        100: { value: '#0a0a0a' },
      },
    },
    components: {
      authenticator: {
        form: {
          padding: { value: '{space.medium} 0 0' },
        },
        router: {
          backgroundColor: { value: 'transparent' },
          borderWidth: { value: '0' },
          boxShadow: { value: 'none' },
        },
      },
      button: {
        borderRadius: { value: '{radii.medium}' },
        fontWeight: { value: '{fontWeights.medium}' },
        link: {
          _hover: {
            color: { value: '{colors.neutral.100}' },
          },
          color: { value: '{colors.neutral.80}' },
        },
        primary: {
          _active: {
            backgroundColor: { value: '{colors.neutral.100}' },
            borderColor: { value: '{colors.neutral.100}' },
          },
          _focus: {
            backgroundColor: { value: '{colors.neutral.80}' },
            borderColor: { value: '{colors.neutral.80}' },
          },
          _hover: {
            backgroundColor: { value: '{colors.neutral.80}' },
            borderColor: { value: '{colors.neutral.80}' },
          },
          backgroundColor: { value: '{colors.neutral.90}' },
          borderColor: { value: '{colors.neutral.90}' },
          color: { value: '{colors.white}' },
        },
      },
      fieldcontrol: {
        _focus: {
          borderColor: { value: '{colors.neutral.80}' },
          boxShadow: { value: '0 0 0 3px rgb(23 23 23 / 0.08)' },
        },
        borderColor: { value: '{colors.neutral.20}' },
        borderRadius: { value: '{radii.medium}' },
      },
      tabs: {
        borderColor: { value: 'transparent' },
        item: {
          _active: {
            backgroundColor: { value: '{colors.white}' },
            borderColor: { value: 'transparent' },
            color: { value: '{colors.neutral.100}' },
          },
          _hover: {
            color: { value: '{colors.neutral.90}' },
          },
          color: { value: '{colors.neutral.60}' },
          fontWeight: { value: '{fontWeights.medium}' },
        },
      },
    },
    fonts: {
      default: {
        static: { value: 'inherit' },
        variable: { value: 'inherit' },
      },
    },
    radii: {
      large: { value: '0.75rem' },
      medium: { value: '0.625rem' },
      small: { value: '0.5rem' },
      xl: { value: '1rem' },
    },
  },
}

export default authTheme
