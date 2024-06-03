import { useEffect } from 'react'

// workspace

export type WorkspaceEventType = 'modal' | 'update' | 'add-channel'

export const dispatchWorkspaceEvent = (eventName: WorkspaceEventType, data: any) => {
    window.dispatchEvent(new CustomEvent('wd-workspace-' + eventName, { detail: data }))
}

export const useWorkspaceEvent = (eventName: WorkspaceEventType, callback: any) => {
    const handler = (e: any) => callback({ ...e.detail })

    useEffect(() => {
        window.addEventListener('wd-workspace-' + eventName, handler)
        return () => window.removeEventListener('wd-workspace-' + eventName, handler)
    })
}

// channel

export type ChannelEventType = 'update'

export const dispatchChannelEvent = (eventName: ChannelEventType, data: any) => {
    window.dispatchEvent(new CustomEvent('wd-channel-' + eventName, { detail: data }))
}

export const useChannelEvent = (eventName: ChannelEventType, callback: any) => {
    const handler = (e: any) => callback({ ...e.detail })

    useEffect(() => {
        window.addEventListener('wd-channel-' + eventName, handler)
        return () => window.removeEventListener('wd-channel-' + eventName, handler)
    })
}
