import { Avatar, Button, Header, Icon, Pill, Popover, Stack, Text, View, useVisibility } from '@fold-dev/core'
import { BellIcon, LifebuoyIcon } from '@heroicons/react/24/outline'
import { AccountMenu } from '../menus/account.menu'
import { SearchComponent } from './search.component'
import * as Token from '@fold-dev/design/tokens-es6'

export const ToolbarComponent = (props: any) => {
    const profileMenu = useVisibility()

    return (
        <>
            <Header
                row
                height="4rem">
                <Stack
                    direction="horizontal"
                    spacing="1.5rem"
                    alignItems="center"
                    colorToken="base-400"
                    p="0rem 1.6rem 0rem 0rem"
                    flex={1}>
                    <SearchComponent />
                    <Button
                        outline
                        size="sm"
                        as="a"
                        variant="accent"
                        target="_blank"
                        href="https://fold.dev/#pro">
                        Buy Pro
                    </Button>
                    <Icon icon={BellIcon} />
                    <Icon icon={LifebuoyIcon} />
                    <Popover
                        arrow
                        width={325}
                        anchor="bottom-right"
                        content={<AccountMenu />}
                        isVisible={profileMenu.visible}
                        onDismiss={profileMenu.hide}>
                        <View
                            row
                            className="f-buttonize"
                            onClick={profileMenu.show}>
                            <Text
                                display="none"
                                color="inherit"
                                m="0 1rem 0 0">
                                Johannes du Plessis
                            </Text>
                            <Avatar
                                presence="online"
                                src="https://avatars.githubusercontent.com/u/5229477?v=4"
                                name="Johannes du Plessis"
                                size="sm"
                            />
                        </View>
                    </Popover>
                </Stack>
            </Header>
        </>
    )
}
