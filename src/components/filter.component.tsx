import {
    Button,
    Card,
    Heading,
    Icon,
    Menu,
    MenuItemOption,
    MenuOptionGroup,
    Popover,
    Stack,
    View,
    useVisibility,
} from '@fold-dev/core'
import {
    ArrowsUpDownIcon,
    CalendarDaysIcon,
    CalendarIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    RectangleStackIcon,
} from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import { DatePicker, DateRangeProvider } from '../../../fold/packages/pro/src'

export const DatePickerComponent = () => {
    const date = new Date()
    const { today, tomorrow, disabled1, disabled2 } = useMemo(() => {
        const today = new Date()
        const tomorrow = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)
        const disabled1 = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)
        const disabled2 = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)
        return {
            today,
            tomorrow,
            disabled1,
            disabled2,
        }
    }, [])
    const [selection, setSelection] = useState<any[]>([[today, tomorrow]])

    const handleSelection = (date: Date) => {
        if (selection.length == 0) {
            setSelection([[date, null]])
        } else {
            const selected = selection[0]
            if (!selected[0]) return setSelection([date, null])
            if (!!selected[0] && !!selected[1]) return setSelection([[date, null]])
            if (!!selected[0] && !selected[1])
                return setSelection(selected[0] > date ? [[date, selected[0]]] : [[selected[0], date]])
        }
    }

    const selectPresetDate = (preset) => {
        const now = new Date()
        let start = new Date()
        let end = new Date()

        switch (preset) {
            case 'today':
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
                break
            case 'tomorrow':
                const tomorrow = new Date(now)
                tomorrow.setDate(now.getDate() + 1)
                start = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
                end = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59, 999)
                break
            case 'this-week':
                const dayOfWeek = now.getDay()
                const startOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek
                start = new Date(now)
                start.setDate(now.getDate() + startOffset)
                start.setHours(0, 0, 0, 0)
                end = new Date(start)
                end.setDate(start.getDate() + 6)
                end.setHours(23, 59, 59, 999)
                break
            case 'this-month':
                start = new Date(now.getFullYear(), now.getMonth(), 1)
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
                break
            case 'last-6-weeks':
                end = new Date(now)
                const dayOfWeek1 = end.getDay()
                const endOffset = 7 - (dayOfWeek1 === 0 ? 7 : dayOfWeek1)
                end.setDate(end.getDate() + endOffset)
                end.setHours(23, 59, 59, 999)
                start = new Date(end)
                start.setDate(end.getDate() - 6 * 7 + 1)
                start.setHours(0, 0, 0, 0)
                break
            case 'last-6-months':
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
                start = new Date(now.getFullYear(), now.getMonth() - 5, 1)
                start.setHours(0, 0, 0, 0)
                break
            case 'last-year':
                end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
                start = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0)
                break
        }

        setSelection([[start, end]])
    }

    return (
        <DateRangeProvider>
            <View
                row
                p={10}
                gap="1rem"
                width="fit-content"
                alignItems="flex-end">
                <View
                    column
                    gap={3}
                    width={130}
                    height={350}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    p="1rem">
                    <Heading
                        as="h5"
                        m="0 0 1rem 0">
                        Presets
                    </Heading>
                    <Button
                        variant="accent"
                        subtle
                        size="sm"
                        active
                        onClick={() => selectPresetDate('today')}>
                        Today
                    </Button>
                    <Button
                        variant="accent"
                        subtle
                        size="sm"
                        active
                        onClick={() => selectPresetDate('tomorrow')}>
                        Tomorrow
                    </Button>
                    <Button
                        variant="accent"
                        subtle
                        size="sm"
                        active
                        onClick={() => selectPresetDate('this-week')}>
                        This week
                    </Button>
                    <Button
                        variant="accent"
                        subtle
                        size="sm"
                        active
                        onClick={() => selectPresetDate('this-month')}>
                        This month
                    </Button>
                    <Button
                        variant="accent"
                        subtle
                        size="sm"
                        active
                        onClick={() => selectPresetDate('last-6-weeks')}>
                        Last 6 weeks
                    </Button>
                    <Button
                        variant="accent"
                        subtle
                        size="sm"
                        active
                        onClick={() => selectPresetDate('last-6-months')}>
                        Last 6 months
                    </Button>
                    <Button
                        variant="accent"
                        subtle
                        size="sm"
                        active
                        onClick={() => selectPresetDate('last-year')}>
                        Last year
                    </Button>
                </View>
                <DatePicker
                    defaultDate={date}
                    selection={selection}
                    onChange={handleSelection}
                    width={600}
                    height={350}
                    disabled={[[disabled1, disabled2]]}
                    panels={2}
                />
            </View>
            <View
                row
                p={10}
                gap="1rem"
                width="100%"
                justifyContent="flex-end">
                <Button>Cancel</Button>
                <Button variant="accent">Save</Button>
            </View>
        </DateRangeProvider>
    )
}

export const FilterComponent = (props: any) => {
    const groupMenu = useVisibility()
    const sortMenu = useVisibility()
    const dateMenu = useVisibility()

    return (
        <View
            row
            zIndex={100}
            gap="1rem"
            colorToken="text-weaker"
            border="none"
            p="0">
            <View row>
                <Button
                    subtle
                    height="2.25rem">
                    <Icon
                        icon={FunnelIcon}
                        size="sm"
                    />
                </Button>
                <Popover
                    width="fit-content"
                    anchor="bottom-right"
                    isVisible={dateMenu.visible}
                    onDismiss={dateMenu.hide}
                    content={<DatePickerComponent />}>
                    <Button
                        subtle
                        height="2.25rem"
                        onClick={dateMenu.show}
                        prefix={
                            <Icon
                                icon={CalendarIcon}
                                size="sm"
                            />
                        }>
                        2 June - 3 June
                    </Button>
                </Popover>
                <Popover
                    width="fit-content"
                    anchor="bottom-right"
                    isVisible={groupMenu.visible}
                    onDismiss={groupMenu.hide}
                    content={
                        <Menu>
                            <MenuOptionGroup
                                title="Group by"
                                defaultValue="status"
                                type="radio">
                                <MenuItemOption value="status">Status</MenuItemOption>
                                <MenuItemOption value="priority">Priority</MenuItemOption>
                                <MenuItemOption value="label">Label</MenuItemOption>
                            </MenuOptionGroup>
                        </Menu>
                    }>
                    <Button
                        subtle
                        height="2.25rem"
                        prefix={
                            <Icon
                                icon={RectangleStackIcon}
                                size="sm"
                            />
                        }
                        onClick={groupMenu.show}>
                        Status
                    </Button>
                </Popover>

                <Popover
                    width="fit-content"
                    anchor="bottom-right"
                    isVisible={sortMenu.visible}
                    onDismiss={sortMenu.hide}
                    content={
                        <Menu>
                            <MenuOptionGroup
                                title="Sort by"
                                defaultValue="custom"
                                type="radio">
                                <MenuItemOption value="custom">Custom</MenuItemOption>
                                <MenuItemOption value="date">Date</MenuItemOption>
                                <MenuItemOption value="priority">Priority</MenuItemOption>
                                <MenuItemOption value="title">Title</MenuItemOption>
                            </MenuOptionGroup>
                        </Menu>
                    }>
                    <Button
                        subtle
                        height="2.25rem"
                        onClick={sortMenu.show}
                        prefix={
                            <Icon
                                icon={ArrowsUpDownIcon}
                                size="sm"
                            />
                        }>
                        Custom
                    </Button>
                </Popover>
            </View>
        </View>
    )
}
