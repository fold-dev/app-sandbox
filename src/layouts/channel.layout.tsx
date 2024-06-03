import {
    Avatar,
    AvatarGroup,
    Editable,
    Flexer,
    Footer,
    Header,
    Heading,
    Icon,
    IconLib,
    Kbd,
    Pill,
    Tab,
    TabList,
    Text,
    View,
} from '@fold-dev/core'
import * as Token from '@fold-dev/design/tokens-es6'
import {
    CalendarIcon,
    ChartBarIcon,
    CheckCircleIcon,
    CloudArrowUpIcon,
    QueueListIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { PiPlusCircleFill } from 'react-icons/pi'
import { Outlet, useNavigate, useParams } from 'react-router'
import { BlockComponent } from '../components/block.component'
import { FilterComponent } from '../components/filter.component'

export const getLastUrlPath = () => {
    const urlParts = window.location.href.split('?')[0].split('/')
    return urlParts[urlParts.length - 1]
}

export const ChannelLayout = (props: any) => {
    const { workspaceId, channelId } = useParams()
    const [selected, setSelected] = useState(1)
    const navigate = useNavigate()

    const navigateToTool = (tool: string) => navigate(`/app/workspace/${workspaceId}/channel/${channelId}/${tool}`)

    const handleSelection = (selected) => {
        setSelected(selected)
        switch (selected) {
            case 0:
                return navigateToTool('list')
            case 1:
                return navigateToTool('board')
            case 2:
                return navigateToTool('calendar')
            case 3:
                return navigateToTool('table')
            case 4:
                return navigateToTool('import')
        }
    }

    useEffect(() => {
        switch (getLastUrlPath()) {
            case 'list':
                return setSelected(0)
            case 'board':
                return setSelected(1)
            case 'calendar':
                return setSelected(2)
            case 'table':
                return setSelected(3)
            case 'import':
                return setSelected(4)
            default:
                setSelected(0)
        }
    }, [channelId])

    return (
        <>
            <View
                row
                flex={1}
                width="100%"
                style={{ overflow: 'hidden' }}
                justifyContent="flex-start"
                position="relative"
                bgToken="surface">
                <View
                    column
                    flex={1}
                    p="0 0rem"
                    height="100%"
                    width="100%"
                    position="relative"
                    justifyContent="stretch">
                    <Header
                        gap={5}
                        colorToken="purple-500"
                        zIndex={10}
                        border="none"
                        p="1rem 1.75rem 0rem 1.5rem"
                        m="0 0 0rem 0">
                        <Icon
                            size="sm"
                            icon={UserCircleIcon}
                        />
                        <Text
                            size="sm"
                            fontWeight="bold"
                            color="inherit">
                            Engineering
                        </Text>
                        <Flexer />
                        <View
                            row
                            gap="1.5rem">
                            <Text
                                size="sm"
                                fontWeight="bold"
                                className="f-buttonize"
                                colorToken="base-400">
                                Invite Members
                            </Text>
                            <Text
                                size="sm"
                                fontWeight="bold"
                                className="f-buttonize"
                                colorToken="base-400">
                                Share Project
                            </Text>
                            <Text
                                size="sm"
                                fontWeight="bold"
                                className="f-buttonize"
                                colorToken="base-400">
                                Settings
                            </Text>
                        </View>
                    </Header>

                    <Header
                        row
                        gap="1rem"
                        border="none"
                        p="1.25rem 1.5rem 0.5rem 1.5rem"
                        justifyContent="flex-start">
                        <BlockComponent
                            invert
                            icon="fire"
                            color={Token.ColorNeonpink400}
                        />

                        <View
                            column
                            alignItems="flex-start">
                            <Editable>
                                <Heading
                                    as="h4"
                                    fontWeight={600}>
                                    App Engine
                                </Heading>
                            </Editable>
                        </View>

                        <Icon
                            className="f-buttonize"
                            icon={StarIconSolid}
                            color={Token.ColorYellow400}
                        />

                        <Pill
                            display="none"
                            subtle
                            color={Token.ColorPurple400}
                            size="sm"
                            prefix={
                                <Icon
                                    size="sm"
                                    icon={UserCircleIcon}
                                />
                            }>
                            Engineering
                        </Pill>

                        <Flexer />

                        <View
                            radius={100}
                            className="f-buttonize-outline"
                            p={3}>
                            <AvatarGroup>
                                <Avatar
                                    size="sm"
                                    name="Charlene Singh"
                                    style={{ outline: '3px solid var(--f-color-surface)', outlineOffset: -1 }}
                                    src="/women/01.jpg"
                                />
                                <Avatar
                                    size="sm"
                                    name="Craig Pather"
                                    style={{ outline: '3px solid var(--f-color-surface)', outlineOffset: -1 }}
                                    src="/men/01.jpg"
                                />
                                <Avatar
                                    size="sm"
                                    name="Etienne Dreyer"
                                    style={{ outline: '3px solid var(--f-color-surface)', outlineOffset: -1 }}
                                    src="/men/09.jpg"
                                />
                                <Avatar
                                    size="sm"
                                    style={{ outline: '3px solid var(--f-color-surface)', outlineOffset: -1 }}>
                                    <Text size="sm">+3</Text>
                                </Avatar>
                            </AvatarGroup>
                        </View>

                        <Icon
                            size="xl"
                            style={{
                                '--f-icon-sizing-xl': '2.25rem',
                                'borderRadius': 50,
                            }}
                            icon={PiPlusCircleFill}
                            color="var(--f-color-accent)"
                            className="f-buttonize-outline"
                        />
                    </Header>

                    <View
                        column
                        flex={1}
                        width="100%"
                        height="100%"
                        bgToken="surface"
                        justifyContent="stretch">
                        <Header
                            row
                            gap={5}
                            bg="transparent"
                            zIndex={100}
                            p="0 1.5rem 0 1.5rem"
                            m="0rem 0 0rem 0">
                            <TabList
                                selected={selected}
                                onSelect={handleSelection}
                                border="0"
                                bg="transparent"
                                style={{
                                    '--f-tabs-tab-padding': '0.75rem',
                                }}>
                                <Tab
                                    prefix={
                                        <Icon
                                            icon={CheckCircleIcon}
                                            size="sm"
                                        />
                                    }>
                                    List
                                </Tab>
                                <Tab
                                    prefix={
                                        <Icon
                                            icon={ChartBarIcon}
                                            size="sm"
                                            style={{ transform: 'rotateZ(180deg)' }}
                                        />
                                    }>
                                    Board
                                </Tab>
                                <Tab
                                    prefix={
                                        <Icon
                                            icon={CalendarIcon}
                                            size="sm"
                                        />
                                    }>
                                    Calendar
                                </Tab>
                                <Tab
                                    prefix={
                                        <Icon
                                            size="sm"
                                            icon={QueueListIcon}
                                        />
                                    }>
                                    Table
                                </Tab>
                                <Tab
                                    prefix={
                                        <Icon
                                            icon={CloudArrowUpIcon}
                                            size="sm"
                                        />
                                    }>
                                    CSV Import
                                </Tab>
                            </TabList>
                            <Flexer />
                            <FilterComponent />
                        </Header>

                        <View
                            flex={1}
                            height="100%"
                            width="100%"
                            position="relative">
                            <View
                                position="absolute"
                                className="f-scrollbar"
                                style={{ top: 0, left: 0, overflowY: 'auto' }}
                                width="100%"
                                height="100%">
                                <Outlet />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <Footer
                row
                width="100%"
                bg="transparent"
                position="relative"
                height="2rem"
                gap={5}
                p="0 0.5rem"
                justifyContent="flex-start"
                colorToken="base-500">
                <IconLib
                    icon="check-circle"
                    size="sm"
                />
                <Text
                    size="sm"
                    color="inherit">
                    Meeting in 5m
                </Text>
                <Flexer />
                <Text
                    size="sm"
                    color="inherit">
                    <Kbd>cntrl</Kbd> + <Kbd>p</Kbd> for help commands
                </Text>
            </Footer>
        </>
    )
}
