import { Icon } from '@fold-dev/core'
import {
    AtSymbolIcon,
    BellIcon,
    Cog6ToothIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    ExclamationCircleIcon,
    FaceSmileIcon,
    FlagIcon,
    HashtagIcon,
    HeartIcon,
    LightBulbIcon,
    LinkIcon,
    ListBulletIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    MusicalNoteIcon,
    PhotoIcon,
    PlusCircleIcon,
    QueueListIcon,
    RadioIcon,
    ShieldCheckIcon,
    StarIcon,
    TagIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import {
    CalendarIcon,
    CheckCircleIcon,
    CloudIcon,
    CubeIcon,
    FireIcon,
    InboxIcon,
    MapIcon,
    MegaphoneIcon,
    PencilIcon,
    SunIcon,
} from '@heroicons/react/24/outline'
import { forwardRef } from 'react'
import { IoMdPulse } from 'react-icons/io'

export function Markdown(props) {
    return (
        <svg
            viewBox="0 0 640 512"
            width={props.size}
            height={props.size}
            fill="none"
            stroke={props.color}
            strokeWidth={props.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}>
            <path
                fill={props.color}
                d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z"
            />
        </svg>
    )
}

export const icons = {
    // used as icons
    'bell': BellIcon,
    'pen': PencilIcon,
    'light': LightBulbIcon,
    'flag': FlagIcon,
    'smile': FaceSmileIcon,
    'shield': ShieldCheckIcon,
    'monitor': ComputerDesktopIcon,
    'smartphone': DevicePhoneMobileIcon,
    'hash': HashtagIcon,
    'map': MapIcon,
    'cloud': CloudIcon,
    'radio': RadioIcon,
    'box': CubeIcon,
    'megaphone': MegaphoneIcon,
    'fire': FireIcon,
    'heart': HeartIcon,
    'music': MusicalNoteIcon,
    'photo': PhotoIcon,
    'tag': TagIcon,
    'star': StarIcon,
    'at': AtSymbolIcon,
    'pin': MapPinIcon,
    'link': LinkIcon,
    'list-numbered': ListBulletIcon,
    'list-bulleted': QueueListIcon,
    'search': MagnifyingGlassIcon,
    'markdown': Markdown,
    'pulse': IoMdPulse,
    'inbox': InboxIcon,
    'today': SunIcon,
    'tasks': CheckCircleIcon,
    'calendar': CalendarIcon,
    'settings': Cog6ToothIcon,
    'team': UserCircleIcon,
    'importance': FlagIcon,
    'unassigned': QueueListIcon,
    'new': PlusCircleIcon,
}

export const IconComponent = forwardRef((props: any, ref) => {
    const { icon, ...rest } = props
    const iconSvg = icons[icon] || ExclamationCircleIcon
    return (
        <Icon
            ref={ref}
            icon={iconSvg}
            {...rest}
        />
    )
})
