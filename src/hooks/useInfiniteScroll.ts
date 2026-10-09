import { useEffect } from 'react'

const useInfiniteScroll = (
    target: React.RefObject<HTMLElement | null>,
    enabled: boolean,
    onIntersect: () => void,
) => {
    useEffect(() => {
        const element = target.current

        if (!enabled || !element) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onIntersect()
                }
            },
            { rootMargin: '250px' },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [enabled, onIntersect, target])
}

export default useInfiniteScroll