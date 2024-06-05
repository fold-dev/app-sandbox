import * as data from '@/dummy-data'
import { Link, View } from '@fold-dev/core'
import { CsvImporter } from '@fold-pro/react'

export const CsvimporterUsage = () => {
    return (
        <CsvImporter
            step={1}
            separator=","
            onComplete={(data) => console.log('data', data)}
            csvData={data.csv}
            defaultRecords={data.records}
            defaultHeader={data.headers}
            defaultMapping={data.mapping}
            schema={[
                { key: 'customer-id', label: 'Customer ID', type: 'string' },
                { key: 'first-name', label: 'First Name', type: 'string' },
                { key: 'last-name', label: 'Last Name', type: 'string' },
                { key: 'company', label: 'Company', type: 'string' },
                { key: 'website', label: 'Website', type: 'string' },
                {
                    key: 'email',
                    label: 'Email',
                    type: 'string',
                    validate: ({ value }) => {
                        const valid = String(value)
                            .toLowerCase()
                            .match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            )

                        if (valid) {
                            return []
                        } else {
                            return ['Not a valid email address']
                        }
                    },
                },
                {
                    key: 'subscription-date',
                    label: 'Subscription Date',
                    type: 'date',
                    transform: ({ value }) => {
                        return new Date(value).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                    },
                },
            ]}
            toolbar={
                <View
                    row
                    gap={5}
                    justifyContent="flex-start">
                    <Link
                        href="https://drive.google.com/uc?id=1x2IdSNcHGLmot9i1h90gwMJr5lULC2QV&export=download"
                        target="_blank">
                        Download CSV file ↗
                    </Link>
                </View>
            }
        />
    )
}

export const ImportPro = () => {
    return <CsvimporterUsage />
}
