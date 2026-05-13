import { useEffect } from 'react'

export function useScrollReveal(phase) {
  useEffect(() => {
    if (phase !== undefined && phase !== 'main') return

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              entry.target.querySelectorAll('.progress-fill').forEach(bar => {
                bar.classList.add('active')
              })
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      )

      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el)
      })

      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  }, [phase])
}
