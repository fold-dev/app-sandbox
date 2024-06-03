import * as data from '@/dummy_data'
import { FIX, Icon, Menu, MenuProvider, MenuSection, Pill, Text, View } from '@fold-dev/core'
import {
    DataGrid,
    DataGridHeader,
    DataGridTypes,
    dataGridState,
    dispatchDataGridEvent,
    setExperimentalGlobalRowCellComponents,
} from '@fold-pro/react'
import { useLayoutEffect, useState } from 'react'
import * as Token from '@fold-dev/design/tokens-es6'

export const Borderless = () => {
    const [columnWidths, setColumnWidths] = useState(data.widths)
    const [columns, setColumns] = useState<DataGridTypes.Column[]>(data.columns)
    const [footerColumns, setFooterColumns] = useState<DataGridTypes.Column[]>(data.footer)
    const [rows, setRows] = useState<DataGridTypes.Cell[][]>(data.rows)

    const handleColumnMove = ({ origin, target }) => {
        dataGridState({
            columnWidths,
            setColumnWidths,
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
            columns,
            setColumns,
            footerColumns,
            setFooterColumns,
            rows,
            setRows,
        }).handleCellDelete({ row, col })
    }

    useLayoutEffect(() => {
        setExperimentalGlobalRowCellComponents(data._rowCellComponents)
    }, [])

    return (
        <MenuProvider
            menu={({ data: { target, payload }, dismiss }) => (
                <Menu>
                    <MenuSection>
                        <Pill
                            subtle
                            color={Token.ColorAccent500}
                            size="sm">
                            DataGrid menu coming soon!
                        </Pill>
                    </MenuSection>
                </Menu>
            )}>
            <div
                style={
                    {
                        '--f-data-grid-row-padding-left': '3rem',
                        '--f-data-grid-row-padding-right': '3px',
                    } as any
                }>
                <DataGrid
                    border="0"
                    id="instance-1"
                    defaultCellSelection={{}}
                    defaultRowSelection={{}}
                    draggableColumns
                    draggableRows
                    maxRowsSelectable={undefined}
                    singleRowSelect={false}
                    onSelect={({ rows, cols }: any) => null}
                    variant="virtual"
                    virtual={{
                        rows: 10,
                        rowHeight: 40,
                        paddingTop: 40,
                        paddingBottom: 30,
                    }}
                    hideCheckbox={false}
                    hideGutter={false}
                    rows={rows}
                    columnWidths={columnWidths}
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
                            display={
                                !Object.values(rowSelection).length && Object.values(cellSelection).length < 2
                                    ? 'none'
                                    : 'flex'
                            }
                            style={{ bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
                            <Text color="inherit">
                                {Object.values(rowSelection).length} rows, &nbsp;
                                {Object.values(cellSelection).length} cells
                            </Text>
                            <Icon
                                icon={FIX}
                                className="f-buttonize"
                                onClick={() => {
                                    dispatchDataGridEvent('select-cells', { instanceId: 'instance-1' })
                                    dispatchDataGridEvent('select-rows', { instanceId: 'instance-1' })
                                }}
                            />
                        </View>
                    )}
                />
            </div>
        </MenuProvider>
    )
}

export const TablePro = () => {
    return <Borderless />
}
