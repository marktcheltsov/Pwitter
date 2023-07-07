import { ButtonProps } from '@/types/layout.interfaces'
import {FC} from 'react'

const Button: FC<ButtonProps> = ({label, secondary, fullWidth, onClick, disabled, large, outline}) => {
  return (
    <button  disabled={disabled} onClick={onClick} className={`disabled:opacity-70 disabled:cursor-pointer rounded-full font-semibold hover: opacity-80 transition border-2
    ${fullWidth ? 'w-full' : 'w-fit'}
    ${secondary ? 'bg-white' : 'bg-sky-500'}
    ${secondary ? 'text-black' : 'text-white'}
    ${secondary ? 'border-black' : 'border-sky-500'}
    ${large ? 'text-xl' : 'text-md'}
    ${large ? 'px-5' : 'px-5'}
    ${large ? 'py-3' : 'py-2'}
    ${outline ? 'bg-trasparent' : ''}
    ${outline ? 'border-white' : ''}
    ${outline ? 'text-white' : ''}
    `}>{label}</button>
  )
}

export default Button