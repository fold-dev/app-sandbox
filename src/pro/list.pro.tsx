import * as data from '@/dummy_data'
import {
    FIX,
    Icon,
    MenuProvider,
    Text,
    View
} from '@fold-dev/core'
import {
    Detail,
    LabelMenu,
    Popup,
    Todo, TodoSectionMenu, UserMenu,
    dispatchTodoEvent,
    todoState
} from '@fold-pro/react'
import { useState } from 'react'

export const TodoUsage = () => {
    const [sections, setSections] = useState<any>(data.sections)
    const [task, setTask] = useState<any>({})
    const [options, setOptions] = useState<any>([])

    const handleTaskOpen = (task) => {
        todoState({ task, setTask, sections, setSections }).handleTaskOpen(task)
    }

    const handleTaskUpdate = (taskData) => {
        todoState({ task, setTask, sections, setSections }).handleTaskUpdate(taskData)
    }

    const handleTaskDelete = (task) => {
        todoState({ task, setTask, sections, setSections }).handleTaskDelete(task)
    }

    const handleTaskAddBelow = ({ id, shouldIndent, task: { title, users, badges, labels } }) => {
        todoState({ task, setTask, sections, setSections }).handleTaskAddBelow({
            id,
            shouldIndent,
            task: { title, users, badges, labels },
        })
    }

    const handleTaskAdd = ({ task, sectionIndex }) => {
        todoState({ task, setTask, sections, setSections }).handleTaskAdd({ task, sectionIndex })
    }

    const handleTaskMove = ({ origin, target, selection }) => {
        todoState({ task, setTask, sections, setSections }).handleTaskMove({ origin, target, selection })
    }

    const handleSectionUpdate = (sec) => {
        todoState({ task, setTask, sections, setSections }).handleSectionUpdate(sec)
    }

    const handleSectionDelete = (sec) => {
        todoState({ task, setTask, sections, setSections }).handleSectionDelete(sec)
    }

    const handleSectionAdd = ({ name, sectionIndex }) => {
        todoState({ task, setTask, sections, setSections }).handleSectionAdd({ name, sectionIndex })
    }

    const handleSectionMove = ({ origin, target }) => {
        todoState({ task, setTask, sections, setSections }).handleSectionMove({ origin, target })
    }

    const handleTrigger = (word) => {
        if (word.trim().charAt(0) == '@') {
            setOptions(data.richInputUsers)
        } else if (word.trim().charAt(0) == '#') {
            setOptions(data.richInputLabels)
        } else {
            setOptions([])
        }
    }

    const handleHighlight = (word, cb, always = false) => {
        if (word.includes('date:')) {
            cb({
                phrase: word.trim(),
                type: 'date',
                value: word.split(':')[1].trim(),
            })
        } else {
            if (always) cb(null)
        }
    }

    const getMenu = ({ data: { target, payload }, dismiss }) => {
        switch (target) {
            case 'todo-label':
                return (
                    <LabelMenu
                        onFilter={(value) => console.log('filter', value)}
                        availableLabels={data.availableLabels}
                        labels={payload.labels}
                        onCancel={dismiss}
                        onSave={(labels) => {
                            handleTaskUpdate({ ...payload, labels })
                            dismiss()
                        }}
                    />
                )
            case 'todo-user':
                return (
                    <UserMenu
                        onFilter={(value) => console.log('filter', value)}
                        availableUsers={data.availableUsers}
                        users={payload.users}
                        onCancel={dismiss}
                        onSave={(users) => {
                            handleTaskUpdate({ ...payload, users })
                            dismiss()
                        }}
                    />
                )
            case 'todo-menu':
                return (
                    <Popup
                        isTodo
                        item={payload}
                        onCancel={dismiss}
                        colorPalette={data.colorPalette}
                        onTodoAddBelow={() => {
                            dismiss()
                            dispatchTodoEvent('open-addbelow', { id: payload.id })
                        }}
                        onTodoEdit={() => {
                            dismiss()
                            dispatchTodoEvent('edit-task', { id: payload.id })
                        }}
                        onSave={(card) => {
                            dismiss()
                            handleTaskUpdate({ ...payload, ...card })
                        }}
                        onView={() => {
                            dismiss()
                            setTask(payload)
                        }}
                        onDelete={() => {
                            dismiss()
                            handleTaskDelete(payload)
                        }}
                    />
                )
            case 'todo-section':
                return (
                    <TodoSectionMenu
                        colorPalette={data.colorPalette}
                        onSave={(section) => {
                            handleSectionUpdate({ ...payload, ...section })
                            dismiss()
                        }}
                        onDelete={() => {
                            handleSectionDelete(payload)
                            dismiss()
                        }}
                        section={payload}
                    />
                )
            default:
                return null
        }
    }

    return (
        <>
            {!!task.id && (
                <Detail
                    colorPalette={data.colorPalette}
                    availableLabels={data.availableLabels}
                    availableUsers={data.availableUsers}
                    item={{ ...task }}
                    onCancel={() => {
                        setTask({})
                    }}
                    onSave={(task) => {
                        handleTaskUpdate(task)
                        setTask({})
                    }}
                    onDelete={(task) => {
                        handleTaskDelete(task)
                        setTask({})
                    }}
                />
            )}

            <MenuProvider menu={getMenu}>
                <Todo
                    sections={sections}
                    onTaskOpen={handleTaskOpen}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskAdd={handleTaskAdd}
                    onTaskAddBelow={handleTaskAddBelow}
                    onTaskMove={handleTaskMove}
                    onSectionUpdate={handleSectionUpdate}
                    onSectionAdd={handleSectionAdd}
                    onSectionMove={handleSectionMove}
                    availableLabels={data.availableLabels}
                    onLabelFilter={(value) => console.log('filter labels', value)}
                    availableUsers={data.availableUsers}
                    onUserFilter={(value) => console.log('filter users', value)}
                    richInputHighlight={handleHighlight}
                    richInputTrigger={handleTrigger}
                    richInputOptions={options}
                    editableSectionName={true}
                    showSectionCount={true}
                    hideCheckbox={false}
                    collapsibleSection={true}
                    collapsibleTask={true}
                    targetVariant={{ cards: 'animated', nav: 'focus' }}
                    task={undefined}
                    sectionHeader={undefined}
                    defaultSelection={{}}
                    toolbar={({ selection }) => {
                        return (
                            <View
                                row
                                position="absolute"
                                bgToken="surface-inverse"
                                colorToken="text-on-color"
                                p="1rem 2rem"
                                radius="var(--f-radius)"
                                shadow="var(--f-shadow-xl)"
                                zIndex={1000}
                                gap={10}
                                className="f-fadein"
                                display={!Object.keys(selection).length ? 'none' : 'flex'}
                                style={{ bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                                <Text color="inherit">{Object.keys(selection).length} selected</Text>
                                <Icon
                                    icon={FIX}
                                    className="f-buttonize"
                                    onClick={() => dispatchTodoEvent('select', {})}
                                />
                            </View>
                        )
                    }}
                />
            </MenuProvider>
        </>
    )
}

export const ListPro = () => {
    return (
        <View p="0 2rem">
            <TodoUsage />
        </View>
    )
}
