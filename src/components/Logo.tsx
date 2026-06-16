interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-auto',
  md: 'h-8 w-auto',
  lg: 'h-10 w-auto',
  xl: 'h-16 w-auto',
};

export function Logo({ size = 'lg', className = '' }: LogoProps) {
  return (
    <svg viewBox="0 0 140 40" fill="none" aria-hidden="true" className={`${sizeClasses[size]} ${className}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="gracecanvas-logo-gradient" x1="0" y1="0" x2="140" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M24 4C24 4 40 8 40 20C40 32 24 36 24 36" stroke="url(#gracecanvas-logo-gradient)" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M24 4V36" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M12 20H36" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <text x="48" y="28" fill="url(#gracecanvas-logo-gradient)" fontSize="18" fontWeight="700" fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" textAnchor="start">
        GraceCanvas
      </text>
    </svg>
  );
}
