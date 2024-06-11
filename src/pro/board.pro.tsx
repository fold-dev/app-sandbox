import * as data from '@/dummy-data'
import { MenuProvider, View } from '@fold-dev/core'
import {
    Detail,
    Kanban,
    KanbanColumnMenu,
    KanbanSelection,
    KanbanSwimlaneMenu,
    KanbanTypes,
    LabelMenu,
    Popup,
    UserMenu,
    kanbanState,
} from '@fold-pro/react'
import { useState } from 'react'

export const KanbanUsage = () => {
    const [swimlanes, setSwimlanes] = useState<KanbanTypes.Swimlane[]>([data.swimlanes[0]])
    const [card, setCard] = useState<any>({})

    const handleCardMove = ({ origin, target }, selection: KanbanSelection[]) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardMove({ origin, target }, selection)
    }

    const handleColumnMove = ({ origin, target }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnMove({ origin, target })
    }

    const handleSwimlaneMove = ({ origin, target }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleSwimlaneMove({ origin, target })
    }

    const handleCardOpen = (card) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardOpen(card)
    }

    const handleCardAdd = ({ value, swimlaneIndex, columnIndex }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardAdd({ value, swimlaneIndex, columnIndex })
    }

    const handleCardUpdate = (ca) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardUpdate(ca)
    }

    const handleCardDelete = (ca) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleCardDelete(ca)
    }

    const handleColumnAdd = ({ value, swimlaneIndex }) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnAdd({ value, swimlaneIndex })
    }

    const handleColumnUpdate = (col) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnUpdate(col)
    }

    const handleColumnDelete = (col) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleColumnDelete(col)
    }

    const handleSwimlaneUpdate = (sl) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleSwimlaneUpdate(sl)
    }

    const handleSwimlaneDelete = (sl) => {
        kanbanState({ swimlanes, setSwimlanes, card, setCard }).handleSwimlaneDelete(sl)
    }

    const getMenu = ({ data: { target, payload }, dismiss }) => {
        switch (target) {
            case 'kanban-label':
                return (
                    <LabelMenu
                        onFilter={(value) => console.log('filter', value)}
                        availableLabels={data.availableLabels}
                        labels={payload.labels}
                        onCancel={dismiss}
                        onSave={(labels) => {
                            handleCardUpdate({ ...payload, labels })
                            dismiss()
                        }}
                    />
                )
            case 'kanban-user':
                return (
                    <UserMenu
                        onFilter={(value) => console.log('filter', value)}
                        availableUsers={data.availableUsers}
                        users={payload.users}
                        onCancel={dismiss}
                        onSave={(users) => {
                            handleCardUpdate({ ...payload, users })
                            dismiss()
                        }}
                    />
                )
            case 'kanban-menu':
                return (
                    <Popup
                        colorPalette={data.colorPalette}
                        item={payload}
                        onCancel={dismiss}
                        onSave={(card) => {
                            dismiss()
                            handleCardUpdate({ ...payload, ...card })
                        }}
                        onView={() => {
                            dismiss()
                            setCard(payload)
                        }}
                        onDelete={() => {
                            dismiss()
                            handleCardDelete(payload)
                        }}
                    />
                )
            case 'kanban-column':
                return (
                    <KanbanColumnMenu
                        colorPalette={data.colorPalette}
                        onSave={(column) => {
                            handleColumnUpdate({ ...payload, ...column })
                            dismiss()
                        }}
                        onDelete={() => {
                            handleColumnDelete(payload)
                            dismiss()
                        }}
                        column={payload}
                    />
                )
            case 'kanban-swimlane':
                return (
                    <KanbanSwimlaneMenu
                        colorPalette={data.colorPalette}
                        onSave={(swimlane) => {
                            handleSwimlaneUpdate({ ...payload, ...swimlane })
                            dismiss()
                        }}
                        onDelete={() => {
                            handleSwimlaneDelete(payload)
                            dismiss()
                        }}
                        swimlane={payload}
                    />
                )
            default:
                return null
        }
    }

    return (
        <View
            width="100%"
            height="100%">
            {!!card.id && (
                <Detail
                    colorPalette={data.colorPalette}
                    availableLabels={data.availableLabels}
                    availableUsers={data.availableUsers}
                    item={card}
                    onCancel={() => setCard({})}
                    onSave={(card) => {
                        handleCardUpdate(card)
                        setCard({})
                    }}
                    onDelete={(card) => {
                        handleCardDelete(card)
                        setCard({})
                    }}
                />
            )}

            <MenuProvider menu={getMenu}>
                <Kanban
                    style={{ '--f-kanban-swimlane-minheight': '100%' }}
                    swimlanes={swimlanes}
                    onCardOpen={handleCardOpen}
                    onCardAdd={handleCardAdd}
                    onCardMove={handleCardMove}
                    onColumnAdd={handleColumnAdd}
                    onColumnMove={handleColumnMove}
                    onSwimlaneMove={handleSwimlaneMove}
                    onColumnUpdate={handleColumnUpdate}
                    onSwimlaneUpdate={handleSwimlaneUpdate}
                    targetVariant={{ cards: 'animated', nav: 'focus' }}
                    card={undefined}
                    columnHeader={undefined}
                    swimlaneHeader={undefined}
                />
            </MenuProvider>
        </View>
    )
}

export const BoardPro = () => {
    return <KanbanUsage />
}
