import {
    Avatar,
    Button,
    ButtonGroup,
    DarkModeButton,
    Input,
    Menu,
    MenuDivider,
    MenuItem,
    MenuItemOption,
    MenuOptionGroup,
    MenuSection,
    Stack,
    Text,
    View,
} from '@fold-dev/core'
import { useState } from 'react'
import { CollapsiblePanelComponent } from '../components/collapsable-panel.component'
import { DND_OPTIONS } from '../constants'

export const AccountMenu = (props) => {
    const dndOptions = DND_OPTIONS
    const [position, setPosition] = useState('')
    const [status, setStatus] = useState('')

    const getCurrentDndIndex = () => 1

    const handleTeamMemberPositionChange = async () => {}

    const handleUpdateUserStatus = async () => {}

    const handleUpdateUserDnd = async (dnd) => {}

    const handleUpdateUserPresence = async (presence) => {}

    return (
        <Menu
            width="100%"
            border="0">
            <MenuSection column>
                <Stack
                    direction="vertical"
                    spacing={5}
                    noStretch
                    p={20}>
                    <Avatar
                        size="xl"
                        presence="online"
                        src="https://avatars.githubusercontent.com/u/5229477?v=4"
                        name="Johannes du Plessis"
                        border="0.2rem solid var(--f-color-surface)"
                    />
                    <Text size="lg">Johannes du Plessis</Text>
                    <Text
                        colorToken="text-weaker"
                        size="sm">
                        CTO
                    </Text>
                    <Text>EMEA</Text>
                </Stack>
            </MenuSection>

            <MenuDivider />

            <MenuOptionGroup
                title="Presence"
                defaultValue="online"
                type="radio">
                <MenuItemOption
                    value="online"
                    onClick={() => handleUpdateUserPresence(null)}>
                    Online (default)
                </MenuItemOption>
                <MenuItemOption
                    value="away"
                    onClick={() => handleUpdateUserPresence('away')}>
                    Away
                </MenuItemOption>
                <MenuItemOption
                    value="busy"
                    onClick={() => handleUpdateUserPresence('busy')}>
                    Busy
                </MenuItemOption>
                <MenuItemOption
                    value="invisible"
                    onClick={() => handleUpdateUserPresence('invisible')}>
                    Invisible
                </MenuItemOption>
            </MenuOptionGroup>

            <MenuDivider />

            <MenuSection>
                <CollapsiblePanelComponent heading="Status">
                    <View
                        row
                        gap={5}
                        p="5px">
                        <Input
                            placeholder="Update your status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{ outline: 'none' }}
                        />
                        <Button onClick={handleUpdateUserStatus}>Update</Button>
                    </View>
                </CollapsiblePanelComponent>
            </MenuSection>

            <MenuDivider />

            <MenuSection>
                <CollapsiblePanelComponent heading="Team Role">
                    <View
                        row
                        gap={5}
                        p="5px">
                        <Input
                            placeholder="Update your role"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            style={{ outline: 'none' }}
                        />
                        <Button onClick={handleTeamMemberPositionChange}>Update</Button>
                    </View>
                </CollapsiblePanelComponent>
            </MenuSection>

            <MenuDivider />

            <MenuSection>
                <CollapsiblePanelComponent heading="Do not disturb for...">
                    <View p="5px">
                        <ButtonGroup>
                            {DND_OPTIONS.map(({ option, value }, index) => (
                                <Button
                                    key={index}
                                    active={value == getCurrentDndIndex()}
                                    onClick={() => handleUpdateUserDnd(dndOptions[index].value)}>
                                    {option}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </View>
                </CollapsiblePanelComponent>
            </MenuSection>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
            <MenuSection>
                <DarkModeButton size="sm" />
            </MenuSection>
        </Menu>
    )
}
