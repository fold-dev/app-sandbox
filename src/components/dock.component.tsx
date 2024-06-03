import { Button, Header, Icon, LogoSolid, Sidebar, Stack, View } from '@fold-dev/core'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { BlockComponent } from './block.component'

export const DockComponent = (props: any) => {
    const navigate = useNavigate()
    const { workspaceId } = useParams()
    const workspaces = useMemo(() => {
        return [
            { id: 'workspace1', name: 'Fold', image: '/fold.png' },
            { id: 'workspace2', name: 'Quantum Solutions', image: '' },
            { id: 'workspace3', name: 'Apex Innovations', image: '' },
            { id: 'workspace4', name: 'Stellar Nexus', image: '' },
            { id: 'workspace5', name: 'EchoWave', image: '' },
            { id: 'workspace6', name: 'Vortex Dynamics Corp', image: '' },
        ]
    }, [])

    return (
        <Sidebar
            left
            column
            bg="transparent"
            justifyContent="flex-start"
            width="4rem">
            <Header
                row
                position="relative"
                height="4rem"
                m="0rem 0 0 0"
                width="100%"
                justifyContent="center">
                <LogoSolid
                    size="sm"
                    color="var(--f-color-accent-600)"
                />
                <View
                    height="4rem"
                    width={1}
                    bgToken="surface"
                    position="absolute"
                    style={{ right: -1, top: -1 }}
                />
            </Header>

            <Stack
                border="none"
                bgToken="transparent"
                width="100%"
                spacing="1rem"
                direction="vertical"
                alignItems="center"
                flex={1}
                p="1rem 0 0 0">
                {workspaces.map((workspace: any, index: number) => (
                    <BlockComponent
                        key={index}
                        className="f-buttonize"
                        name={workspace.name}
                        src={workspace.image}
                        onClick={() => navigate(`/app/workspace/${workspace.id}`)}
                        style={{
                            outlineOffset: '0rem',
                            outline: workspace.id == workspaceId ? '0.25rem solid var(--f-color-accent-500)' : null,
                        }}
                    />
                ))}

                <Button
                    subtle
                    width={30}
                    height={30}
                    variant="neutral">
                    <Icon
                        icon={PlusCircleIcon}
                        size="lg"
                    />
                </Button>
            </Stack>
        </Sidebar>
    )
}
