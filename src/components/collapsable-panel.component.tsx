import { Collapsible, FIChevronDown, FIChevronLeft, Icon, Text, View, useVisibility } from '@fold-dev/core'

export const CollapsiblePanelComponent = (props: any) => {
    const { heading, children } = props
    const { show, hide, visible, toggle } = useVisibility(false)

    return (
        <View column>
            <View
                row
                className="f-buttonize"
                onClick={toggle}
                width="100%"
                colorToken="text-weakest"
                p="0.5rem 0">
                <Text
                    size="sm"
                    flex={1}
                    fontWeight="bold"
                    color="inherit">
                    {heading}
                </Text>
                <Icon
                    icon={visible ? FIChevronDown : FIChevronLeft}
                    size="sm"
                />
            </View>
            <Collapsible open={visible}>{children}</Collapsible>
        </View>
    )
}
