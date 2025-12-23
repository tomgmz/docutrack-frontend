import { HiHome } from "react-icons/hi";
import { BsFolder } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { TiPinOutline } from "react-icons/ti";
import { CiLock } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const userMenu = [
   {
    label: "Home",
    icon: <HiHome size={25}/>,
    path: "/home",
    },
    {
    label: "All Files",
    icon: <BsFolder size={25}/>,
    path: "/allFiles",
    },
    {
    label: "Stared",
    icon: <CiStar size={25}/>,
    path: "/stared",
    },
    {
    label: "Important",
    icon: <TiPinOutline size={25}/>,
    path: "/important",
    },
    {
    label: "Locked Files",
    icon: <CiLock size={25}/>,
    path: "/lockedFiles",
    },
    {
    label: "More",
    icon: <MdOutlineKeyboardArrowDown size={25}/>,
    path: "/moreTab",
    },
];


