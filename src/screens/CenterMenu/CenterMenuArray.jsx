//* CenterMenuArray.jsx
import {Icons} from '../../components/IconListRouter';

export const menuArray = [
  {
    section: 'Shopping',
    defaultOpen: true,
    items: [
      // future feature
      {
        title: 'Scan to',
        icon: <Icons.Barcode />,
        action: {
          screen: 'ShoppingItems',
          params: {
            title: 'Scan Item',
            itemId: null,
            navigateBackTo: 'ShoppingList',
            scanAction: true,
          },
        },
      },
      {
        title: 'Add to',
        icon: <Icons.AddList />,
        action: {
          screen: 'ShoppingItems',
          params: {
            title: 'Add Item(s)',
            itemId: null,
            navigateBackTo: 'ShoppingList',
            scanAction: false,
          },
        },
      },

      {
        title: 'View List',
        icon: <Icons.MenuList />,
        action: 'ShoppingList',
      },
      {
        title: 'View Cart',
        icon: <Icons.Shopping />,
        action: 'ShoppingCart',
      },
    ],
  },
  {
    section: 'Cupboard',
    defaultOpen: true,
    items: [
      // future feature
      {
        title: 'Scan to',
        icon: <Icons.Barcode />,
        action: {
          screen: 'CupboardItems',
          params: {
            title: 'Scan Item',
            itemId: null,
            navigateBackTo: 'CupboardList-Single',
            scanAction: true,
          },
        },
      },
      {
        title: 'Add to',
        icon: <Icons.AddList />,
        action: {
          screen: 'CupboardItems',
          params: {
            title: 'Add Item(s)',
            itemId: null,
            navigateBackTo: 'CupboardList-Single',
            scanAction: false,
          },
        },
      },
      {
        title: 'View List',
        icon: <Icons.Cupboards />,
        action: 'CupboardList-Single',
      },
    ],
  },
  {
    section: 'Favorites',
    defaultOpen: true,
    items: [
      {
        title: 'Add to',
        icon: <Icons.AddList />,
        action: {
          screen: 'FavoriteItems',
          params: {
            title: 'Add Item(s)',
            itemId: null,
            navigateBackTo: 'FavoritesList',
          },
        },
      },

      {
        title: 'View List',
        icon: <Icons.Favorite />,
        action: 'FavoritesList',
      },
    ],
  },
  // future feature
  {
    section: 'Recipe',
    defaultOpen: true,
    items: [
      {
        title: 'Search',
        icon: <Icons.Search />,
        action: 'RecipeSearch',
      },
      {
        title: 'Add to',
        icon: <Icons.AddList />,
        action: 'AddRecipe',
      },

      {title: 'View List', icon: <Icons.Chest />, action: 'RecipeBox'},
    ],
  },
  {
    section: 'Misc',
    defaultOpen: true,
    items: [
      {
        title: 'View Account',
        icon: <Icons.Account />,
        action: 'Account',
      },
      {
        title: 'View Profile',
        icon: <Icons.Profile />,
        action: 'AccountProfile',
      },
      {
        title: 'View Settings',
        icon: <Icons.Settings />,
        action: 'AccountSettings',
      },
      {
        title: 'Get Help',
        icon: <Icons.Help />,
        action: 'AccountHelp',
      },
      {
        title: 'LogOut',
        icon: <Icons.Logout />,
        action: 'Logout',
      },
    ],
  },
  // __DEV__
  //   ? {
  //       section: '(Development)',
  //       defaultOpen: false,
  //       items: [
  //         {
  //           title: 'Dev Playground',
  //           icon: <Icons.Dev />,
  //           action: 'DevPlayground',
  //         },
  //         {
  //           title: 'Text',
  //           icon: <Icons.Dev />,
  //           action: 'DevText',
  //         },
  //         {
  //           title: 'Inputs',
  //           icon: <Icons.Dev />,
  //           action: 'DevInputs',
  //         },
  //         {
  //           title: 'Buttons',
  //           icon: <Icons.Dev />,
  //           action: 'DevButtons',
  //         },
  //         {
  //           title: 'Modals',
  //           icon: <Icons.Dev />,
  //           action: 'DevModals',
  //         },
  //         {
  //           title: 'Dropdowns',
  //           icon: <Icons.Dev />,
  //           action: 'DevDropdowns',
  //         },
  //       ],
  //     }
  //   : null,
].filter(Boolean);
