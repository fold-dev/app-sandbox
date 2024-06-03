import {
    Icon,
    Menu,
    MenuDivider,
    MenuHeading,
    MenuItem,
    MenuItemOption,
    MenuOptionGroup,
    MenuSection,
    Palette,
    View,
} from '@fold-dev/core'
import { Cog6ToothIcon, ShareIcon, StarIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CollapsiblePanelComponent } from '../components/collapsable-panel.component'
import { IconComponent } from '../components/icon.component'
import { dispatchChannelEvent } from '../hooks/event.hooks'
import { COLORS } from '../constants'

export const icons = [
    'bell',
    'pen',
    'light',
    'flag',
    'smile',
    'shield',
    'monitor',
    'smartphone',
    'hash',
    'map',
    'cloud',
    'radio',
    'box',
    'megaphone',
    'fire',
    'heart',
    'music',
    'photo',
]

export const colors = [
    ...COLORS,
    '#050f2c',
    '#003666',
    '#00aeff',
    '#3369e7',
    '#8e43e7',
    '#b84592',
    '#ff4f81',
    '#ff6c5f',
    '#ffc168',
    '#2dde98',
    '#1cc7d0',
    '#00a98f',
]

export const ChannelMenu = ({ data, onOpen }) => {
    const { channel } = data
    const { workspaceId } = useParams()
    const [icon, setIcon] = useState(channel.icon)
    const [color, setColor] = useState(channel.color)

    const handleUpdate = async () => {
        dispatchChannelEvent('update', { ...channel, icon, color })
    }

    useEffect(() => {
        handleUpdate()
    }, [color, icon])

    return (
        <Menu width={250}>
            <MenuHeading>{channel.name}</MenuHeading>
            <MenuItem
                onClick={onOpen}
                prefix={<Icon icon={Cog6ToothIcon} />}>
                Settings
            </MenuItem>
            <MenuItem prefix={<Icon icon={StarIcon} />}>Star</MenuItem>
            <MenuItem prefix={<Icon icon={ShareIcon} />}>Share</MenuItem>
            <MenuItem prefix={<Icon icon={UserPlusIcon} />}>Invite People</MenuItem>
            <MenuDivider />
            <MenuSection display={channel.isPrivate ? 'none' : 'block'}>
                <CollapsiblePanelComponent heading="Theme">
                    <Palette
                        p="0 0 1rem 0"
                        style={{ '--f-color-palette-size': '1rem' }}
                        onChange={setColor}
                        color={color}
                        colors={colors}
                    />
                </CollapsiblePanelComponent>
            </MenuSection>
            <MenuDivider display={channel.isPrivate ? 'none' : 'block'} />
            <MenuSection display={channel.isPrivate ? 'none' : 'block'}>
                <CollapsiblePanelComponent heading="Icon">
                    <View
                        row
                        wrap="wrap"
                        justifyContent="flex-start">
                        {icons.map((i, index) => {
                            return (
                                <View
                                    row
                                    p={5}
                                    key={index}
                                    onClick={() => setIcon(i)}
                                    className="f-buttonize"
                                    colorToken={icon == i ? 'text' : 'text-weakest'}>
                                    <IconComponent icon={i} />
                                </View>
                            )
                        })}
                    </View>
                </CollapsiblePanelComponent>
            </MenuSection>
            <MenuDivider />
            <MenuOptionGroup
                title="Notifications"
                defaultValue="all"
                type="radio">
                <MenuItemOption
                    value="all"
                    onClick={(e) => null}>
                    All
                </MenuItemOption>
                <MenuItemOption
                    value="mentions"
                    onClick={(e) => null}>
                    Mentions
                </MenuItemOption>
                <MenuItemOption
                    value="messages"
                    onClick={(e) => null}>
                    Messages
                </MenuItemOption>
                <MenuItemOption
                    value="none"
                    onClick={(e) => null}>
                    Mute
                </MenuItemOption>
            </MenuOptionGroup>
        </Menu>
    )
}
