import { FoldProvider } from '@fold-dev/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/app.layout'
import { ChannelLayout } from './layouts/channel.layout'
import { WorkspaceLayout } from './layouts/workspace.layout'
import { BoardPro } from './pro/board.pro'
import { CalendarPro } from './pro/calendar.pro'
import { ImportPro } from './pro/import.pro'
import { ListPro } from './pro/list.pro'
import { TablePro } from './pro/table.pro'
import { useEffect } from 'react'

const App = (props: any) => {
    useEffect(() => {
        if (!location.pathname.includes('workspace')) window.location.href = '/app/workspace/wsuuid/channel/cuuid/list'
    }, [])

    return (
        <BrowserRouter>
            <FoldProvider>
                <Routes>
                    <Route
                        path="/app"
                        element={<AppLayout />}>
                        <Route
                            path="workspace/:workspaceId"
                            element={<WorkspaceLayout />}>
                            <Route
                                path="channel/:channelId"
                                element={<ChannelLayout />}>
                                <Route
                                    path="list"
                                    element={<ListPro />}
                                />
                                <Route
                                    path="board"
                                    element={<BoardPro />}
                                />
                                <Route
                                    path="calendar"
                                    element={<CalendarPro />}
                                />
                                <Route
                                    path="table"
                                    element={<TablePro />}
                                />
                                <Route
                                    path="import"
                                    element={<ImportPro />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </FoldProvider>
        </BrowserRouter>
    )
}

export default App
