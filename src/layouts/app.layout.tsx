import {
    App,
    Button,
    Content,
    Flexer,
    Heading,
    Icon,
    Link,
    Main,
    Modal,
    ModalClose,
    Sidebar,
    Text,
    View,
} from '@fold-dev/core'
import {
    Bars3BottomLeftIcon,
    CalendarIcon,
    ChartBarIcon,
    ChatBubbleBottomCenterIcon,
    CheckCircleIcon,
    PaperClipIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { DockComponent } from '../components/dock.component'
import { NavComponent } from '../components/nav.component'
import { ToolbarComponent } from '../components/toolbar.component'

export const AppLayout = (props: any) => {
    const [notice, setNotice] = useState(true)

    return (
        <App bgToken="surface">
            <Modal
                borderless
                width={400}
                height="fit-content"
                onDismiss={() => setNotice(false)}
                isVisible={notice}>
                <ModalClose onClick={() => setNotice(false)} />
                <View
                    column
                    gap="2rem"
                    p="3rem">
                    <Heading>Hello! 👋</Heading>
                    <Text size="lg">We're excited to have you here!</Text>
                    <Text>
                        Welcome to the Fold Pro AppSandbox. This app sandbox is currently a work in progress, and is
                        constantly being improved. We hope it illustrates how Fold can be used to build products with great UX.
                    </Text>
                    <View
                        row
                        gap="1rem">
                        <Button
                            as="a"
                            variant="accent"
                            target="_blank"
                            href="https://fold.dev/#pro">
                            Buy Pro
                        </Button>
                        <Button onClick={() => setNotice(false)}>Get Started →</Button>
                    </View>
                </View>
            </Modal>

            <Content height="100%">
                <DockComponent />
                <NavComponent />

                <Main column>
                    <ToolbarComponent />

                    <View
                        row
                        flex={1}
                        p="0rem 0rem 0 0"
                        width="100%">
                        <View
                            flex={1}
                            column
                            height="100%">
                            <Outlet />
                        </View>

                        <Sidebar
                            right
                            bg="transparent"
                            width="4rem"
                            colorToken="base-500"
                            p="1.5rem 0 0 0"
                            gap="1.5rem">
                            <Icon icon={ChatBubbleBottomCenterIcon} />
                            <Icon icon={CheckCircleIcon} />
                            <Icon
                                icon={ChartBarIcon}
                                style={{ transform: 'rotateZ(180deg)' }}
                            />
                            <Icon icon={CalendarIcon} />
                            <Icon icon={UserCircleIcon} />
                            <Icon icon={PaperClipIcon} />
                            <Icon icon={Bars3BottomLeftIcon} />
                            <Flexer />
                        </Sidebar>
                    </View>
                </Main>
            </Content>
        </App>
    )
}
