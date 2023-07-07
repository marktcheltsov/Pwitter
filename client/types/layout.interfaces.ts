import { IconType } from "react-icons"
import { IUser } from "./interfaces";

export interface ISideBarItem {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void;
    auth?: boolean
    alert?: boolean
}

export interface HeaderProps {
    label: string;
    showBackArrow?: boolean;
}

export interface ButtonProps {
    label: string
    secondary?: boolean
    fullWidth?: boolean
    large?: boolean
    onClick: ()=> void
    disabled?: boolean
    outline?: boolean
}

export interface IAvatarProps {
    user: IUser
    isLarge?: boolean
    hasBorder?: boolean
}