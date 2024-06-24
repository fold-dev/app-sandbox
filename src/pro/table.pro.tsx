import * as data from '@/dummy-data'
import { Button, FIBin, Icon, Menu, MenuProvider, MenuSection, Portal, Text, View, useDialog } from '@fold-dev/core'
import {
    DataGrid,
    DataGridHeader,
    DataGridTypes,
    dataGridState,
    dispatchDataGridEvent
} from '@fold-pro/react'
import { useState } from 'react'

export const Borderless = () => {
    const [columnWidths, setColumnWidths] = useState(data.widths)
    const [columns, setColumns] = useState<DataGridTypes.Column[]>(data.columns)
    const [footerColumns, setFooterColumns] = useState<DataGridTypes.Column[]>(data.footer)
    const [columnTypes, setColumnTypes] = useState(data.columnTypes)
    const [rows, setRows] = useState<DataGridTypes.Cell[][]>(data.rows)
    const { setDialog, closeDialog } = useDialog()

    const handleColumnMove = ({ origin, target }) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleColumnMove({ origin, target })
    }

    const handleRowMove = ({ origin, target }) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleRowMove({ origin, target })
    }

    const handleColumnClick = (index, column: DataGridTypes.Column) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleColumnClick(index, column)
    }

    const handleCellUpdate = ({ value, row, col }) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleCellUpdate({ value, row, col })
    }

    const handleCellDelete = ({ row, col }) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
            columnTypes,
            setColumnTypes,
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleCellDelete({ row, col })
    }

    return (
        <MenuProvider
            menu={({ data: { target, payload }, dismiss }) => (
                <Menu>
                    <MenuSection>Menu for: {target}</MenuSection>
                </Menu>
            )}>
            <DataGrid
                id="instance-1"
                // provider:
                defaultCellSelection={{}}
                defaultRowSelection={{}}
                draggableColumns
                draggableRows
                maxRowsSelectable={undefined}
                singleRowSelect={false}
                onSelect={({ rows, cols }: any) => null}
                // core:
                // height={467}
                // variant="default"
                variant="virtual"
                virtual={{
                    rows: 10,
                    rowHeight: 40,
                    paddingTop: 40,
                    paddingBottom: 30,
                }}
                hideCheckbox={false}
                rows={rows}
                columnWidths={columnWidths}
                columnTypes={columnTypes}
                header={
                    <DataGridHeader
                        resizableColumns
                        columns={columns}
                        onColumnClick={handleColumnClick}
                        onWidthChange={(index, width) =>
                            setColumnWidths(columnWidths.map((w, i) => (i == index ? width : w)))
                        }
                    />
                }
                footer={
                    <DataGridHeader
                        hideCheckbox
                        component={data.FooterCell}
                        columns={footerColumns}
                        style={{
                            '--f-data-grid-cell-height': '30px',
                            'bottom': 0,
                        }}
                    />
                }
                pinFirst
                pinLast
                onCellUpdate={handleCellUpdate}
                onCellDelete={handleCellDelete}
                onColumnMove={handleColumnMove}
                onRowMove={handleRowMove}
                toolbar={({ rowSelection, cellSelection }) => (
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
                        display={!Object.values(rowSelection).length ? 'none' : 'flex'}
                        style={{ bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                        <Text color="inherit">
                            {Object.values(rowSelection).length}{' '}
                            {Object.values(rowSelection).length == 1 ? 'row' : 'rows'} selected
                        </Text>
                        <Icon
                            icon={FIBin}
                            className="f-buttonize"
                            onClick={() => {
                                setDialog({
                                    title: 'Are you sure?',
                                    description: 'This action cannot be undone.',
                                    portal: Portal,
                                    footer: (
                                        <View
                                            width="100%"
                                            row
                                            justifyContent="space-between">
                                            <Button onClick={closeDialog}>Cancel</Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    const rowIndexes = Object.keys(rowSelection).map(
                                                        (key: any) => +key.split('-')[1]
                                                    )
                                                    setRows(rows.filter((_, index) => !rowIndexes.includes(index)))
                                                    closeDialog()
                                                    dispatchDataGridEvent('select-rows', { instanceId: 'instance-1' })
                                                }}>
                                                Delete
                                            </Button>
                                        </View>
                                    ),
                                })
                            }}
                        />
                    </View>
                )}
            />
        </MenuProvider>
    )
}

export const TablePro = () => {
    return <Borderless />
}
