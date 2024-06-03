import {
    Avatar,
    AvatarGroup,
    Badge,
    ContextMenuContext,
    Divider,
    DragArea,
    DragElement,
    Flexer,
    Footer,
    Header,
    Heading,
    Icon,
    MenuProvider,
    ProgressCircle,
    Resizable,
    Sidebar,
    Text,
    View,
    addElementToArray,
    moveElementInArray,
    removeElementFromArray,
    useDragEvent,
    useVisibility
} from '@fold-dev/core'
import * as Token from '@fold-dev/design/tokens-es6'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PiPlusCircleFill } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router'
import { version } from '../../package.json'
import { useChannelEvent } from '../hooks/event.hooks'
import { ChannelMenu } from '../menus/channel.menu'
import { BlockComponent } from './block.component'

const Channel = (props: any) => {
    const { id, isPrivate, isMain, unread } = props
    const muted = false
    const [name, setName] = useState(props.name)
    const [color, setColor] = useState(props.color)
    const [icon, setIcon] = useState(props.icon)
    const [isClosed, setIsClosed] = useState(props.isClosed)
    const { workspaceId, channelId } = useParams()
    const [over, setOver] = useState(false)
    const isActive = channelId == id || over
    const navigate = useNavigate()
    const { setMenu } = useContext<any>(ContextMenuContext)
    const surfaceRef = useRef(null)
    const showBadge = unread

    const handleNavigate = () => navigate(`/app/workspace/${workspaceId}/channel/${id}`)

    const handleContextMenuClick = (e) => {
        e.preventDefault()
        setMenu(
            {
                channel: {
                    id,
                    color,
                    icon,
                    unread,
                    name,
                    isClosed,
                    isPrivate,
                },
            },
            { x: e.clientX, y: e.clientY }
        )
    }

    const handleChannelUpdateEvent = (channel) => {
        if (channel.id == id) {
            setName(channel.name)
            setColor(channel.color)
            setIcon(channel.icon)
            setIsClosed(channel.isClosed)
        }
    }

    useLayoutEffect(() => {
        const el: any = surfaceRef.current
        el.addEventListener('contextmenu', handleContextMenuClick)
        return () => el.removeEventListener('contextmenu', handleContextMenuClick)
    })

    useChannelEvent('update', handleChannelUpdateEvent)

    return (
        <View
            row
            ref={surfaceRef}
            zIndex={1}
            height="2.2rem"
            width="100%"
            position="relative"
            justifyContent="flex-start"
            className="f-user-select-none"
            onClick={handleNavigate}
            onMouseEnter={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            style={{ cursor: 'pointer', opacity: muted ? 0.75 : 1 }}>
            <View
                row
                width="100%"
                height="100%"
                position="relative"
                justifyContent="stretch"
                radius="var(--f-radius)"
                p="0rem 1.5rem 0rem 1rem"
                colorToken={isActive ? 'base-600' : 'base-600'}
                bgToken={isActive ? 'surface-strong' : ''}>
                <View
                    row
                    width={40}
                    height="100%">
                    {isMain && (
                        <BlockComponent
                            name={name}
                            src={null}
                            icon={icon || 'box'}
                            color={isMain ? Token.ColorBase500 : color || Token.ColorElectric400}
                            size="md"
                        />
                    )}

                    {!isMain && !isPrivate && (
                        <BlockComponent
                            invert
                            name={name}
                            src={null}
                            icon={icon || 'box'}
                            color={isMain ? Token.ColorBase500 : color || Token.ColorElectric400}
                            size="sm"
                        />
                    )}
                </View>

                <View
                    row
                    flex={1}
                    height="100%"
                    className="f-ellipsis"
                    position="relative"
                    justifyContent="flex-start">
                    <Text
                        p="0 0 0 0.1rem"
                        style={{ top: 1, position: 'relative' }}
                        className="f-ellipsis"
                        width="100%"
                        fontSize={isMain ? '1rem' : '1rem'}
                        fontWeight={unread ? 'bold' : isActive ? 'normal' : 'normal'}
                        colorToken={isActive ? 'text' : unread ? 'text-weak' : isMain ? 'text-weaker' : 'text-weaker'}>
                        {name}
                    </Text>
                </View>

                {showBadge && (
                    <Badge
                        bg={Token.ColorAccent500}
                        width={7}
                        height={7}
                        variant="neutral"
                        style={{ marginLeft: 10 }}
                    />
                )}

                {!isMain && (
                    <ProgressCircle
                        value={props.progress}
                        size={15}
                        thickness={20}
                        style={{
                            '--f-progress-background': 'var(--f-color-surface-stronger)',
                            '--f-progress-active': 'var(--f-color-base-300)',
                            'marginLeft': 5,
                        }}
                    />
                )}
            </View>
        </View>
    )
}

export const ChannelGroup = ({ id, name, channels, color, users }) => {
    const hover = useVisibility()
    const list = useVisibility(true)
    const hasList = channels.length != 0
    const style = { border: '2px solid var(--f-color-surface)' }

    return (
        <View
            m="-5px 0 0.5rem 0"
            p="0.2rem"
            position="relative">
            <View
                row
                p="0.2rem 1.5rem 0.5rem 2.1rem"
                m="1rem 0 0 0">
                <Heading
                    as="h6"
                    color={color || 'text-weaker'}
                    position="relative"
                    className="f-ellipsis"
                    fontWeight={500}
                    fontSize="0.9rem"
                    width="100%">
                    {name}
                </Heading>
                <AvatarGroup>
                    {users.map((user, index) => (
                        <Avatar
                            key={index}
                            name={user.name}
                            style={style}
                            src={user.image}
                            size="sm"
                        />
                    ))}
                </AvatarGroup>
            </View>

            <DragArea
                areaId={id}
                group="channels"
                variant="animated"
                direction="vertical"
                targetVariant={{ 'channel-groups': 'focus' }}>
                {channels.map((channel: any, index: number) => (
                    <DragElement
                        key={index}
                        width="100%">
                        <Channel
                            key={channel.id}
                            id={channel.id}
                            name={channel.name}
                            icon={channel.icon}
                            color={channel.color}
                            progress={channel.progress}
                            isClosed={channel.isClosed}
                            unread={channel.unread}
                            excerpt=""
                            readonly={false}
                            muted={false}
                            archived={false}
                        />
                    </DragElement>
                ))}
            </DragArea>
        </View>
    )
}

export const NavComponent = (props: any) => {
    const { workspaceId, channelId } = useParams()
    const [groups, setGroups] = useState([])

    const handleDrop = (e) => {
        const { detail } = e
        const { origin, target } = detail

        // groups
        if (target.group == 'channel-groups' && origin.group == 'channel-groups') {
            setGroups(moveElementInArray(groups, origin, target))
        }

        // channels
        if (target.group == 'channels' && origin.group == 'channels') {
            const originGroup = groups.find((g) => g.id == origin.areaId)
            const originElement = originGroup.channels[origin.index]
            const sameGroup = origin.areaId == target.areaId

            setGroups(
                groups.map((group: any) => {
                    if (sameGroup && group.id == origin.areaId) {
                        return { ...group, channels: moveElementInArray(group.channels, origin, target) }
                    } else if (!sameGroup && group.id == target.areaId) {
                        return { ...group, channels: addElementToArray(group.channels, target.index, originElement) }
                    } else if (!sameGroup && group.id == origin.areaId) {
                        return { ...group, channels: removeElementFromArray(group.channels, origin.index) }
                    } else {
                        return group
                    }
                })
            )
        }

        // channels to groups
        if (target.group == 'channel-groups' && origin.group == 'channels') {
            const originGroup = groups.find((g) => g.id == origin.areaId)
            const originElement = originGroup.channels[origin.index]

            setGroups(
                groups.map((group: any, index: number) => {
                    if (target.index == index && group.id == origin.areaId) {
                        return group
                    } else if (target.index == index) {
                        return { ...group, channels: addElementToArray(group.channels, 0, originElement) }
                    } else if (group.id == origin.areaId) {
                        return { ...group, channels: removeElementFromArray(group.channels, origin.index) }
                    } else {
                        return group
                    }
                })
            )
        }
    }

    useDragEvent('ondrop', handleDrop)

    useEffect(() => {
        const channels = [
            {
                id: 'channel1',
                group: 'Marketing',
                name: 'Brand Elevation',
                color: Token.ColorElectric500,
                progress: 45,
                icon: 'bell',
            },
            {
                id: 'channel2',
                group: 'Marketing',
                name: 'Consumer Pulse',
                color: Token.ColorPurple500,
                progress: 10,
                icon: 'light',
            },
            {
                id: 'channel3',
                group: 'Marketing',
                name: 'Trend Tracker',
                color: Token.ColorNeonpink500,
                unread: true,
                progress: 5,
                icon: 'torch',
            },
            {
                id: 'channel4',
                group: 'Marketing',
                name: 'Engagement Hub',
                color: Token.ColorOrange500,
                isClosed: true,
                progress: 95,
                icon: 'shield',
            },
            {
                id: 'channel5',
                group: 'Marketing',
                name: 'Outreach Blitz',
                color: Token.ColorYellow500,
                progress: 75,
                icon: 'monitor',
            },
            {
                id: 'channel6',
                group: 'Marketing',
                name: 'Insight Boost',
                color: Token.ColorTeal500,
                unread: true,
                progress: 50,
                icon: 'map',
            },
            {
                id: 'channel7',
                group: 'Marketing',
                name: 'Influence Wave',
                color: Token.ColorGreen500,
                progress: 30,
                icon: 'cloud',
            },
            {
                id: 'channel8',
                group: 'Engineering',
                name: 'App Engine',
                color: Token.ColorNeonpink500,
                progress: 20,
                icon: 'fire',
            },
            {
                id: 'channel9',
                group: 'Engineering',
                name: 'Deployments',
                color: Token.ColorAccent500,
                isClosed: true,
                progress: 0,
                icon: 'heart',
            },
            {
                id: 'channel10',
                group: 'Engineering',
                name: 'Cyber Guard',
                color: Token.ColorPurple500,
                unread: true,
                progress: 90,
                icon: 'tag',
            },
            {
                id: 'channel11',
                group: 'Engineering',
                name: 'Cloud Matrix',
                color: Token.ColorYellow500,
                progress: 29,
                icon: 'star',
            },
            {
                id: 'channel12',
                group: 'Engineering',
                name: 'Interface Builder',
                color: Token.ColorTeal500,
                progress: 13,
                icon: 'pin',
            },
        ]
        const channelGroups = channels.reduce((groups, channel) => {
            groups[channel.group] = groups[channel.group] ?? []
            groups[channel.group].push(channel)
            return groups
        }, {})
        const groups = [
            {
                id: 'group1',
                name: 'Engineering',
                color: Token.ColorPurple500,
                users: [
                    { name: 'Charlene Singh', image: 'https://fold.dev/women/01.jpg' },
                    { name: 'Etienne Dreyer', image: 'https://fold.dev/men/01.jpg' },
                    { name: 'Craig Pather' },
                ],
            },
            {
                id: 'group2',
                name: 'Marketing',
                users: [{ name: 'Etienne Dreyer' }, { name: 'Charlene Singh', image: 'https://fold.dev/women/02.jpg' }],
            },
        ].map((group: any) => ({
            ...group,
            channels: channelGroups[group.name],
        }))

        setGroups(groups)
    }, [])

    return (
        <>
            <Sidebar
                left
                bg="transparent"
                p="0 0rem 0 0rem"
                position="relative">
                <Resizable
                    column
                    justifyContent="stretch"
                    width={250}
                    max={350}
                    min={200}
                    height="100%"
                    handle={<></>}
                    railProps={{ style: { '--f-resizable-color': 'transparent' } }}>
                    <Header
                        row
                        height="4rem"
                        m="0rem 0 0rem 0"
                        p="0rem 1.2rem 0 1.6rem"
                        gap={10}
                        position="relative"
                        width="100%">
                        <View
                            height="4rem"
                            width={1}
                            bgToken="surface"
                            position="absolute"
                            style={{ right: -1, top: -1 }}
                        />

                        <Avatar
                            className="f-buttonize"
                            src="/fold.png"
                            name="Fold"
                            size="sm"
                        />

                        <Heading
                            as="h5"
                            fontWeight={600}
                            flex={1}>
                            Fold
                        </Heading>

                        <Flexer />

                        <Icon
                            icon={ChevronUpDownIcon}
                            className="f-buttonize"
                        />
                    </Header>

                    <View
                        flex={1}
                        width="100%"
                        bg="transparent"
                        position="relative"
                        p="1rem 0 0 0"
                        className="f-overflow-y-auto f-scrollbar">
                        <View
                            width="100%"
                            zIndex={100}
                            bgToken="surface"
                            style={{ top: 0 }}
                            position="sticky">
                            <Channel
                                id=""
                                name="Today"
                                icon="today"
                                color={Token.ColorElectric400}
                                isPrivate={false}
                                isClosed={false}
                                isMain={true}
                                unread={false}
                                excerpt=""
                                readonly={false}
                                muted={false}
                                archived={false}
                            />

                            <Channel
                                id=""
                                name="Inbox"
                                icon="inbox"
                                color={Token.ColorYellow400}
                                isPrivate={false}
                                isClosed={false}
                                isMain={true}
                                unread={true}
                                excerpt=""
                                readonly={false}
                                muted={false}
                                archived={false}
                            />

                            <Channel
                                id=""
                                name="My Tasks"
                                icon="tasks"
                                color={Token.ColorNeonpink400}
                                isPrivate={false}
                                isClosed={false}
                                isMain={true}
                                unread={true}
                                excerpt=""
                                readonly={false}
                                muted={false}
                                archived={false}
                            />

                            <Channel
                                id=""
                                name="Calendar"
                                icon="calendar"
                                color={Token.ColorTeal400}
                                isPrivate={false}
                                isClosed={false}
                                isMain={true}
                                unread={false}
                                excerpt=""
                                readonly={false}
                                muted={false}
                                archived={false}
                            />

                            <View height="1rem" />
                            <Divider />
                        </View>

                        <MenuProvider
                            menu={({ data, dismiss }) => (
                                <ChannelMenu
                                    data={data}
                                    onOpen={null}
                                />
                            )}>
                            <DragArea
                                width="100%"
                                group="channel-groups">
                                {groups.map((group: any, index: number) => (
                                    <DragElement
                                        key={index}
                                        width="100%">
                                        <ChannelGroup {...group} />
                                    </DragElement>
                                ))}
                            </DragArea>
                        </MenuProvider>

                        <View
                            p="0rem 2.25rem 0.5rem 2rem"
                            colorToken="base-300"
                            gap={5}
                            width="100%"
                            justifyContent="flex-start"
                            row>
                            <Heading
                                as="h6"
                                colorToken="base-300"
                                position="relative"
                                className="f-ellipsis f-buttonize"
                                fontWeight={500}
                                fontSize="0.9rem"
                                m="0 auto 0 0">
                                Show 5 hidden projects
                            </Heading>
                        </View>

                        <View height="1rem" />
                        <Divider />
                    </View>

                    {/* add button */}
                    <View
                        row
                        width="2.2rem"
                        height="2.2rem"
                        className="f-buttonize-outline"
                        style={{
                            borderRadius: 50,
                            bottom: 40,
                            right: 21,
                            zIndex: 10,
                            position: 'absolute',
                        }}>
                        <Icon
                            size="xl"
                            style={{ '--f-icon-sizing-xl': '2.25rem' }}
                            icon={PiPlusCircleFill}
                            color="var(--f-color-accent)"
                        />
                    </View>

                    <Footer
                        row
                        bg="transparent"
                        width="100%"
                        position="relative"
                        height="2rem"
                        p="0 0.5rem"
                        justifyContent="flex-start">
                        <Text
                            colorToken="base-500"
                            size="sm">
                            Pro Sandbox {version}
                        </Text>
                        <Flexer />
                        <Text
                            colorToken="base-500"
                            size="sm"></Text>
                    </Footer>
                </Resizable>
            </Sidebar>
        </>
    )
}
