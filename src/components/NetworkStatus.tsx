import useNetworkStatus from '../hooks/useNetworkStatus'

const NetworkStatus = () => {
    const isOnline = useNetworkStatus()

    if (isOnline) {
        return null
    }

    return (
        <div
            role="status"
            aria-live="polite"
            className="bg-amber-400 px-4 py-2 text-center text-sm font-semibold text-slate-950"
        >
            You are offline. Showing movies saved from your previous visit.
        </div>
    )
}

export default NetworkStatus