import { useCallback } from "react"

/**
 * Shared hook for smooth scrolling to sections, 
 * accounting for the fixed navbar height.
 */
export function useScrollToSection() {
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLElement>, sectionId: string) => {
      e.preventDefault()
      const section = document.getElementById(sectionId)

      if (section) {
        const navbarHeight = document.querySelector("header")?.offsetHeight || 0
        const sectionTop = section.offsetTop - navbarHeight

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        })
        window.history.pushState(null, "", `#${sectionId}`)
      }
    },
    []
  )

  return scrollToSection
}
