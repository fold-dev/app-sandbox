import {
    Flexer,
    Heading,
    Icon,
    Input,
    Pill,
    Popover,
    Text,
    View,
    getKey
} from '@fold-dev/core'
import {
    ChatBubbleBottomCenterIcon,
    ChatBubbleLeftEllipsisIcon,
    CheckCircleIcon,
    HashtagIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import { useEffect, useMemo, useState } from 'react'

export const plural = (qty, str) => (qty == 1 ? str : str + 's')

const SearchRow = ({ title, description, resource, type, selected, onSelect, ago }) => {
    const [over, setOver] = useState(false)
    const icon = useMemo(() => {
        switch (type) {
            case 'message':
                return ChatBubbleBottomCenterIcon
            case 'task':
                return CheckCircleIcon
            case 'task-comment':
                return ChatBubbleLeftEllipsisIcon
            case 'user':
                return UserIcon
            case 'channel':
                return HashtagIcon
        }
    }, [type])

    return (
        <View
            row
            p="0.5rem 1rem"
            gap={10}
            width="100%"
            colorToken="text-weaker"
            bgToken={selected || over ? 'surface-strong' : undefined}
            onMouseEnter={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            onClick={onSelect}
            className="f-buttonize">
            <Icon icon={icon} />
            <Text>{title}</Text>
            <Text
                colorToken="text-weakest"
                size="sm">
                {description}
            </Text>
            <Flexer />
            <Pill size="sm">{resource}</Pill>
            <Text colorToken="text-weaker">{ago} ago</Text>
        </View>
    )
}

export const SearchComponent = (props: any) => {
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    const handleResultSelect = (result) => {
        setResults([])
    }

    const handleKeyDown = (e) => {
        const { isDown, isUp, isEnter, isEscape } = getKey(e)

        if (isUp) {
            e.preventDefault()
            setIndex(index == 0 ? results.length - 1 : index - 1)
        }

        if (isDown) {
            e.preventDefault()
            setIndex(index == results.length - 1 ? 0 : index + 1)
        }

        if (isEnter) {
            e.preventDefault()
            handleResultSelect(results[index])
        }

        if (isEscape) {
            setResults([])
        }
    }

    const handleFocus = (e) => {
        setTimeout(() => {
            setResults([
                {
                    title: 'Hey ja this is awesome...',
                    description: 'Something',
                    resource: 'Product Demo',
                    type: 'message',
                    ago: '1m',
                },
                { title: 'Create something', description: '', resource: 'Marketing', type: 'task', ago: '2h' },
                { title: 'This is really cool...', description: '', resource: 'Marketing', type: 'task-comment', ago: '3h' },
                { title: 'Jon Smith', description: '', resource: 'CTO', type: 'user', ago: '30m' },
                { title: 'Development', description: '', resource: 'Not important', type: 'channel', ago: '4h' },
            ])
        }, 100)
    }

    useEffect(() => {
        setIndex(0)
    }, [results.length])

    return (
        <Popover
            arrow
            width="100%"
            anchor="bottom-center"
            isVisible={!!results.length}
            onDismiss={() => setResults([])}
            content={
                <View
                    p={10}
                    column
                    alignItems="flex-start">
                    <Heading
                        as="h6"
                        p="0.5rem 1rem"
                        m="0 0 0.2rem 0"
                        colorToken="text-weakest">
                        Found 5 {plural(results.length, 'result')}
                    </Heading>
                    {results.map((result: any, i: number) => (
                        <SearchRow
                            key={i}
                            title={result.title}
                            description={result.description}
                            resource={result.resource}
                            type={result.type}
                            ago={result.ago}
                            selected={index == i}
                            onSelect={() => handleResultSelect(result)}
                        />
                    ))}
                </View>
            }>
            <Input
                placeholder="Search"
                shadow="none"
                flex={1}
                value={search}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearch(e.target.value)}
            />
        </Popover>
    )
}
