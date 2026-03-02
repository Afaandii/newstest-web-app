import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineRectangleStack,
  HiOutlineCog6Tooth,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { FileText } from "lucide-react";
import { FaUserTie } from "react-icons/fa6";

export const navGroups = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: HiOutlineSquares2X2,
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: HiOutlineChartBar,
      },
    ],
  },
  {
    title: "Master",
    items: [
      {
        title: "Categories",
        href: "/dashboard/categories",
        icon: HiOutlineRectangleStack,
      },
      {
        title: "Posts",
        href: "/dashboard/posts",
        icon: FileText,
      },
      {
        title: "Comments",
        href: "/dashboard/comments",
        icon: HiOutlineChatBubbleLeftRight,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        href: "/dashboard/users",
        icon: HiOutlineUsers,
      },
      {
        title: "Roles",
        href: "/dashboard/roles",
        icon: FaUserTie,
      },
      {
        title: "Settings",
        href: "/dashboard",
        icon: HiOutlineCog6Tooth,
      },
    ],
  },
];
