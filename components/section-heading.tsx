import React from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  copy?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${centered ? 'section-heading-centered' : ''} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}
