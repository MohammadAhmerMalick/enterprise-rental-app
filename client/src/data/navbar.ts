interface ListMM {
  label: string
  type: 'list'
  links: {
    label: string
    href: string
  }[]
}

interface FeaturedMM {
  title: string
  type: 'featured'
  description: string
  label: string
  href: string
}

interface LinkMenu {
  label: string
  href: string
  type: 'link'
}

interface MegaMenu {
  label: string
  href: string
  type: 'megaMenu'
  menu: (ListMM | FeaturedMM)[]
}

type MenuItem = MegaMenu | LinkMenu

export const navbarData: MenuItem[] = [
  {
    href: '/buy',
    label: 'Buy',
    menu: [
      {
        label: 'Properties for Sale',
        links: [
          { href: '/', label: 'Apartments' },
          { href: '/', label: 'Houses' },
          { href: '/', label: 'Villas' },
          { href: '/', label: 'Land' },
        ],
        type: 'list',
      },
      {
        label: 'Buyer Tools',
        links: [
          { href: '/', label: 'Mortgage Calculator' },
          { href: '/', label: 'Sold House Prices' },
          { href: '/', label: 'Sale Price Map' },
        ],
        type: 'list',
      },
      {
        label: 'Buying Insights',
        links: [
          { href: '/', label: "Buyer's Guide" },
          { href: '/', label: 'Area Insights' },
          { href: '/', label: 'Community Guides' },
          { href: '/', label: 'Tower & Compound Guides' },
          { href: '/', label: 'Schools & University Guides' },
        ],
        type: 'list',
      },
      {
        description: 'Get the right mortgage for you',
        href: '/',
        label: 'See Your Mortgage Estimate',
        title: 'Featured',
        type: 'featured',
      },
    ],
    type: 'megaMenu',
  },
  {
    href: '/rent',
    label: 'Rent',
    menu: [
      {
        label: 'Properties for Rent',
        links: [
          { href: '/', label: 'Apartments' },
          { href: '/', label: 'Houses' },
          { href: '/', label: 'Villas' },
          { href: '/', label: 'Land' },
        ],
        type: 'list',
      },
      {
        label: 'Renter Tools',
        links: [
          { href: '/', label: 'Rent Calculator' },
          { href: '/', label: 'Rent vs Buy' },
          { href: '/', label: 'Sold House Prices' },
        ],
        type: 'list',
      },
      {
        label: 'Renter Insights',
        links: [
          { href: '/', label: "Renter's Guide" },
          { href: '/', label: "Renter's Area Insights" },
          { href: '/', label: "Renter's Community Guides" },
          { href: '/', label: "Renter's Tower & Compound Guides" },
          { href: '/', label: "Renter's Schools & University Guides" },
        ],
        type: 'list',
      },
      {
        description: 'Get the right mortgage for you',
        href: '/',
        label: 'See Your Mortgage Estimate',
        title: 'Featured',
        type: 'featured',
      },
    ],
    type: 'megaMenu',
  },
  {
    href: '/find-agents',
    label: 'Find Agents',
    type: 'link',
  },
  {
    href: '/morgague',
    label: 'Morgague',
    menu: [
      {
        label: 'Explore your options',
        links: [
          { href: '/', label: 'Rent vs buy calculator' },
          { href: '/', label: 'Eligibility calculator' },
          { href: '/', label: 'Mortgage calculator' },
          { href: '/', label: 'Take the next step' },
        ],
        type: 'list',
      },
      {
        label: 'Take the next step',
        links: [
          { href: '/', label: 'Get pre-approved' },
          { href: '/', label: 'Refinance' },
          { href: '/', label: 'Equity release' },
        ],
        type: 'list',
      },
      {
        description: 'Compare rates from 20+ banks. End-to-end support, free.',
        href: '/',
        label: 'Chat with an advisor',
        title: ' What can you afford?',
        type: 'featured',
      },
    ],
    type: 'megaMenu',
  },
]
