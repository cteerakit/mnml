export type Feature = {
  label: string;
  description: string;
};

export const gmailFeatures: Feature[] = [
  {
    label: 'Narrow your inbox width',
    description:
      'Pick a comfortable width for your inbox and messages—small, medium, large, or full screen like Gmail normally shows.',
  },
  {
    label: 'Hide the Gmail logo',
    description: 'Remove the Gmail logo at the top of the page.',
  },
  {
    label: 'Hide the left menu until you need it',
    description:
      'Inbox, labels, and other items stay out of the way until you hover over the menu or open it. The Compose button can stay visible, or move to a floating button (see below).',
  },
  {
    label: 'Floating Compose button',
    description:
      'Put Compose in a small button at the bottom-right corner instead of the left sidebar.',
  },
  {
    label: 'Hide the toolbar above your emails',
    description:
      'Select, Refresh, and other controls above your message list stay hidden until you move your mouse over that area.',
  },
  {
    label: 'Hide the add-ons panel',
    description: 'Remove the panel on the right used for Gmail add-ons.',
  },
  {
    label: 'Hide the search bar',
    description: 'Remove the search box at the top.',
  },
  {
    label: 'Use a smaller search bar',
    description:
      'Show a compact search field in the center that expands when you click or hover on it.',
  },
  {
    label: 'Hide top-right icons',
    description:
      'Tuck away Support, Settings, Gemini, Google apps, and your profile picture until you hover over that corner.',
  },
  {
    label: 'Hide footer links',
    description: 'Remove links and promos at the bottom of Gmail.',
  },
];

export const youtubeFeatures: Feature[] = [
  {
    label: 'Hide the left menu until you need it',
    description:
      'Give videos more room on screen. Move your mouse to the left edge or the menu button to open navigation when you want it.',
  },
  {
    label: 'Hide the Create button',
    description: 'Remove the upload button at the top.',
  },
  {
    label: 'Hide notifications',
    description: 'Remove the bell icon at the top.',
  },
  {
    label: 'Hide voice search',
    description: 'Remove the microphone button next to search.',
  },
  {
    label: 'Hide the YouTube logo',
    description: 'Remove the YouTube or Premium logo at the top.',
  },
  {
    label: 'Hide category filters',
    description: 'Remove the filter buttons under search on the home page.',
  },
  {
    label: 'Hide Shorts',
    description: 'Remove Shorts rows and Shorts links in the menu.',
  },
  {
    label: 'Hide comments',
    description: 'Remove the comments section while watching a video.',
  },
  {
    label: 'Hide suggested videos',
    description: 'Remove the list of recommended videos on the right.',
  },
  {
    label: 'Hide end screens',
    description: 'Remove overlays and cards that appear at the end of a video.',
  },
];

export const howItWorksSteps = [
  {
    step: '1',
    title: 'Add mnml to Chrome',
    description: 'Install it free from the Chrome Web Store.',
  },
  {
    step: '2',
    title: 'Open mnml',
    description: 'Click the mnml icon in your browser toolbar to see all the options.',
  },
  {
    step: '3',
    title: 'Pick what to hide',
    description:
      'Turn options on or off for Gmail and YouTube. Most changes take effect right away.',
  },
] as const;
