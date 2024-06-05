import * as data from '@/dummy-data'
import {
    Button,
    ButtonGroup,
    Flexer,
    Form,
    Heading,
    IconLib,
    Input,
    MenuProvider,
    Modal,
    Option,
    Options,
    Pill,
    Portal,
    Text,
    View,
    generateUEID,
} from '@fold-dev/core'
import { CalendarDays, CalendarProvider, CalendarSchedule, Detail, Popup, getShortDateFormat } from '@fold-pro/react'
import { useState } from 'react'
import * as Token from '@fold-dev/design/tokens-es6'

export const CalendarPro = () => {
    const [option, setOption] = useState(1)
    const [days, setDays] = useState(data.days)
    const [custom, setCustom] = useState(data.custom)
    const [date, setDate] = useState(data.date)
    const [events, setEvents] = useState(data.events)
    const [event, setEvent] = useState<any>({})
    const [title, setTitle] = useState('')

    const handleEventUpdate = (ev) => {
        setEvents(events.map((event) => (event.id == ev.id ? { ...event, ...ev } : event)))
    }

    const handleEventDelete = (ev) => {
        setEvents(events.filter((event) => event.id != ev.id))
    }

    const handleEventOpen = (event) => {
        setEvent(event)
    }

    const getMenu = ({ data: { target, payload }, dismiss }) => {
        return (
            <Popup
                colorPalette={data.colorPalette}
                item={{ ...payload }}
                onCancel={dismiss}
                onSave={(event) => {
                    dismiss()
                    handleEventUpdate({ ...payload, ...event })
                }}
                onView={() => {
                    dismiss()
                    setEvent(payload)
                }}
                onDelete={() => {
                    dismiss()
                    handleEventDelete(payload)
                }}
            />
        )
    }

    return (
        <View
            width="100%"
            height="100%"
            position="absolute"
            style={{ inset: 0, overflow: 'hidden' }}
            column
            justifyContent="stretch"
            alignContent="stretch"
            alignItems="stretch">
            {!!event.id && (
                <Detail
                    colorPalette={data.colorPalette}
                    availableLabels={data.availableLabels}
                    availableUsers={data.availableUsers}
                    item={event}
                    onCancel={() => setEvent({})}
                    onSave={(event) => {
                        handleEventUpdate(event)
                        setEvent({})
                    }}
                    onDelete={(event) => {
                        handleEventDelete(event)
                        setEvent({})
                    }}
                />
            )}
            <View
                row
                flex={0}
                p="1rem"
                gap="1rem"
                justifyContent="flex-end">
                <Heading
                    as="h3"
                    fontWeight={600}
                    m="0 auto 0 1rem">
                    May
                </Heading>
                <Pill
                    subtle
                    color={Token.ColorAccent500}
                    size="sm">
                    Agenda & Year Coming Soon!
                </Pill>
                <ButtonGroup>
                    <Button>
                        <IconLib icon="chevron-left" />
                    </Button>
                    <Button>
                        <IconLib icon="chevron-right" />
                    </Button>
                </ButtonGroup>
                <Options
                    selected={option}
                    onOptionChange={setOption}>
                    <Option>Day</Option>
                    <Option>Week</Option>
                    <Option>Month</Option>
                    <Option disabled>Year</Option>
                    <Option disabled>Agenda</Option>
                </Options>
            </View>
            <MenuProvider menu={getMenu}>
                <CalendarProvider
                    dimPastEvents={false}
                    hideDateLabels={false}
                    scheduleEvent={undefined}
                    monthEvent={undefined}
                    onEventOpen={handleEventOpen}
                    onEventUpdate={handleEventUpdate}
                    onEventAdd={({ done, event }) => {
                        return (
                            <Modal
                                portal={Portal}
                                isVisible={true}
                                onDismiss={done}
                                header={<Heading as="h3">Create New Event</Heading>}
                                footer={
                                    <View
                                        row
                                        width="100%">
                                        <Button onClick={done}>Cancel</Button>
                                        <Flexer />
                                        <Button
                                            onClick={() => {
                                                setEvents([...events, { ...event, title, id: generateUEID() }])
                                                done()
                                            }}
                                            variant="accent"
                                            outline>
                                            Save
                                        </Button>
                                    </View>
                                }>
                                <Form
                                    column
                                    gap="1rem"
                                    onSubmit={() => {
                                        setEvents([...events, { ...event, title, id: generateUEID() }])
                                        done()
                                    }}
                                    width="100%">
                                    <Input
                                        autoFocus
                                        size="lg"
                                        placeholder="Enter event name"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form>
                            </Modal>
                        )
                    }}>
                    {option == 0 && (
                        <>
                            <View
                                row
                                flex={0}
                                p="0 0 0 var(--f-calendar-schedule-gutter-width)"
                                width="100%">
                                {days.map(({ date }, index) => {
                                    return (
                                        <Text
                                            flex={1}
                                            p="1rem"
                                            fontWeight="bold"
                                            textAlign="center"
                                            key={index}>
                                            {getShortDateFormat(date)}
                                        </Text>
                                    )
                                })}
                            </View>
                            <View
                                height="fit-content"
                                p="0 4px 0 var(--f-calendar-schedule-gutter-width)"
                                width="100%"
                                position="relative"
                                zIndex={1}>
                                <CalendarDays
                                    noClamp
                                    date={date}
                                    events={events.filter((e) => e.allDay)}
                                    custom={[[new Date('2024-05-04')]]}
                                    height="fit-content"
                                />
                            </View>
                            <View
                                width="100%"
                                flex={1}
                                position="relative"
                                zIndex={0}
                                m="-1px 0 0 0"
                                style={{ overflowY: 'scroll' }}
                                className="f-scrollbar">
                                <CalendarSchedule
                                    height="100%"
                                    style={{ minHeight: 1000 }}
                                    days={[days[0]]}
                                    events={events.filter((e) => !e.allDay)}
                                />
                            </View>
                        </>
                    )}

                    {option == 1 && (
                        <>
                            <View
                                row
                                flex={0}
                                p="0 0 0 var(--f-calendar-schedule-gutter-width)"
                                width="100%">
                                {days.map(({ date }, index) => {
                                    return (
                                        <Text
                                            flex={1}
                                            p="1rem"
                                            fontWeight="bold"
                                            textAlign="center"
                                            key={index}>
                                            {getShortDateFormat(date)}
                                        </Text>
                                    )
                                })}
                            </View>
                            <View
                                height="fit-content"
                                p="0 4px 0 var(--f-calendar-schedule-gutter-width)"
                                width="100%"
                                position="relative"
                                zIndex={1}>
                                <CalendarDays
                                    noClamp
                                    date={date}
                                    events={events.filter((e) => e.allDay)}
                                    custom={custom}
                                    height="fit-content"
                                />
                            </View>
                            <View
                                width="100%"
                                flex={1}
                                position="relative"
                                zIndex={0}
                                m="-1px 0 0 0"
                                style={{ overflowY: 'scroll' }}
                                className="f-scrollbar">
                                <CalendarSchedule
                                    height="100%"
                                    style={{ minHeight: 1000 }}
                                    days={days}
                                    events={events.filter((e) => !e.allDay)}
                                />
                            </View>
                        </>
                    )}

                    {option == 2 && (
                        <View 
                            width="100%"
                            height="100%"
                            column
                            justifyContent="stretch"
                            alignContent="stretch"
                            alignItems="stretch">
                            <View 
                                flex={1} 
                                className="f-scrollbar"
                                style={{ overflowY: 'auto' }}>
                                <CalendarDays
                                    style={{ height: '100%', minHeight: 750 }}
                                    date={date}
                                    events={events}
                                />
                            </View>
                        </View>
                    )}
                </CalendarProvider>
            </MenuProvider>
        </View>
    )
}
