interface ButtonProps {
  text: string
  size?: 'medium' | 'large'
  icon?: string
  iconAlt?: string
  onClick?: () => void
}

export function Button({ text, size = 'medium', icon, iconAlt = 'icon', onClick }: ButtonProps) {
  const sizeClasses = size === 'large' ? 'px-5 py-4 text-lg' : 'px-5 py-2.5 text-sm'

  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md font-semibold text-white transition-colors ${sizeClasses}`}
      style={{ backgroundColor: 'var(--dark-green)' }}
      onClick={onClick}
    >
      {icon && <img src={icon} alt={iconAlt} width={16} height={16} />}
      {text}
    </button>
  )
}
