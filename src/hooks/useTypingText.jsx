import { useState, useEffect } from 'react'

export default function useTypingText(texts, typingSpeed = 100, pauseDuration = 2000) {
  const [currentText, setCurrentText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!texts || texts.length === 0) {
      return undefined
    }

    const currentFullText = texts[textIndex]
    const isAtFullText = !isDeleting && charIndex === currentFullText.length
    const timerDelay = isAtFullText ? pauseDuration : isDeleting ? typingSpeed / 2 : typingSpeed

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, charIndex + 1))
          setCharIndex((prev) => prev + 1)
        } else {
          setIsDeleting(true)
        }
      } else {
        if (charIndex > 0) {
          setCurrentText(currentFullText.slice(0, charIndex - 1))
          setCharIndex((prev) => prev - 1)
        } else {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, timerDelay)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, pauseDuration])

  return currentText
}