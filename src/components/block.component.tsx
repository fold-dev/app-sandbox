import { Image, Text, View, addAlpha, classNames } from '@fold-dev/core'
import { forwardRef, useMemo } from 'react'
import { IconComponent } from '../components/icon.component'

export const BlockComponent = forwardRef((props: any, ref) => {
    const { subtle, size = 'md', color, icon, name, src, srcSet, fallbackSrc, invert, style = {}, ...rest } = props
    const { width, height, radius } = useMemo(() => {
        switch (size) {
            case 'xl':
                return { width: 50, height: 50, radius: 'var(--f-radius)' }
            case 'lg':
                return { width: 34, height: 34, radius: 'var(--f-radius)' }
            case 'md':
                return { width: 30, height: 30, radius: 'var(--f-radius)' }
            case 'sm':
                return { width: 22, height: 22, radius: 'var(--f-radius)' }
            default:
                return { width: 20, height: 20, radius: 'var(--f-radius)' }
        }
    }, [size])
    const initials = useMemo(() => {
        return (String(name) || '')
            .split(' ')
            .splice(0, 2)
            .map((str: string) => str.charAt(0))
            .join('')
            .toUpperCase()
    }, [name])
    const styles = useMemo(() => {
        if (color) {
            const foreground = color 
            const background = addAlpha(color, 0.15) 

            return invert
                ? {
                      ...style,
                      flexShrink: 0,
                      color: subtle ? background : foreground,
                      backgroundColor: subtle ? foreground : background,
                  }
                : {
                      flexShrink: 0,
                      ...style,
                      color,
                  }
        } else {
            return {
                ...style,
                color: 'var(--f-color-accent)',
                backgroundColor: 'var(--f-color-surface-strong)',
            }
        }
    }, [color, style])
    const className = classNames({ 'f-row': true }, [props.className])

    return (
        <View
            {...rest}
            ref={ref}
            style={styles}
            width={width}
            height={height}
            radius={radius}
            className={className}>
            {/* If there is a picture */}
            {(src || srcSet || fallbackSrc) && (
                <Image
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    src={src}
                    srcSet={srcSet}
                    fallbackSrc={fallbackSrc}
                    loader
                />
            )}

            {/* If there is an icon */}
            {icon && (
                <IconComponent
                    icon={icon}
                    size={size}
                    color={styles.color}
                />
            )}

            {/* If there is no picture or icon */}
            {!src && !srcSet && !fallbackSrc && !icon && (
                <Text
                    as="span"
                    size={size}
                    color="currentColor">
                    {initials}
                </Text>
            )}

            {/* Otherwise, display children */}
            {props.children}
        </View>
    )
})
