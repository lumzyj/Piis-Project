// @ts-ignore
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
  } from "@iconscout/react-unicons";

  // Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: UilClipboardAlt,
      heading: "Transfer",
      path: "/transfer",
    },
    {
      icon: UilUsersAlt,
      heading: "Create Account",
      path: "/user"
    },
    {
      icon: UilPackage,
      heading: 'Transfer History',
      path: "/transaction",
    },
  ];

    // Analytics Cards Data
export const cardsData = [
  {
    title: "Balance",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: " Total Transaction",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
];
// Recent Update Card Data
