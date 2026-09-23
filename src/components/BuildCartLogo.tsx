import React from 'react';

export type LogoVariant =
  | 'light' // Navy cart + yellow excavator + navy "Build" / yellow "Cart" on light bg
  | 'dark' // White cart + yellow excavator + white "Build" / yellow "Cart" on dark navy bg
  | 'yellow' // Navy everything on solid yellow bg
  | 'black' // Solid black on white
  | 'white' // Solid white on black
  | 'grayscale'; // Grayscale versions

interface BuildCartLogoProps {
  variant?: LogoVariant;
  iconOnly?: boolean;
  showTagline?: boolean;
  customTagline?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BuildCartIcon: React.FC<{
  variant?: LogoVariant;
  className?: string;
  size?: number;
}> = ({ variant = 'light', className = '', size = 36 }) => {
  // Determine SVG colors based on variant
  let cartColor = '#001440'; // Cetacean Blue
  let excavatorColor = '#FFC30B'; // Mikado Yellow
  let wheelColor = '#001440';

  if (variant === 'dark') {
    cartColor = '#FFFFFF';
    excavatorColor = '#FFC30B';
    wheelColor = '#FFFFFF';
  } else if (variant === 'yellow') {
    cartColor = '#001440';
    excavatorColor = '#001440';
    wheelColor = '#001440';
  } else if (variant === 'black') {
    cartColor = '#000000';
    excavatorColor = '#000000';
    wheelColor = '#000000';
  } else if (variant === 'white') {
    cartColor = '#FFFFFF';
    excavatorColor = '#FFFFFF';
    wheelColor = '#FFFFFF';
  } else if (variant === 'grayscale') {
    cartColor = '#334155';
    excavatorColor = '#94A3B8';
    wheelColor = '#1E293B';
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="BuildCart mark: shopping cart with rising excavator arm and bucket"
    >
      {/* EXCAVATOR ARM & BUCKET (Rising up from inside the cart basket) */}
      <g id="excavator-arm" transform="translate(0, 0)">
        {/* Hydraulic Cylinder */}
        <path
          d="M38 48 L48 30"
          stroke={excavatorColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Main Boom Arm rising from cart floor */}
        <path
          d="M32 54 L44 26 L52 23 L44 54 Z"
          fill={excavatorColor}
        />
        {/* Boom Joint Pivot */}
        <circle cx="48" cy="24.5" r="4" fill={variant === 'yellow' || variant === 'black' ? '#FFFFFF' : '#001440'} />
        <circle cx="48" cy="24.5" r="2" fill={excavatorColor} />

        {/* Dipper / Forearm extending forward & down */}
        <path
          d="M48 24.5 L72 32 L75 39 L51 30 Z"
          fill={excavatorColor}
        />
        {/* Forearm Joint Pivot */}
        <circle cx="73.5" cy="35.5" r="3.5" fill={variant === 'yellow' || variant === 'black' ? '#FFFFFF' : '#001440'} />

        {/* Excavator Bucket with digging teeth */}
        <path
          d="M72 35.5 L86 42 C87 46 84 52 76 53 L70 48 L73 40 Z"
          fill={excavatorColor}
        />
        {/* Bucket teeth */}
        <path
          d="M86 42 L89 44 L87 46 L90 48 L86 50 L87 52 L83 53"
          stroke={excavatorColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* SHOPPING CART (Basket, handle, chassis, wheels) */}
      <g id="shopping-cart">
        {/* Push Handle */}
        <path
          d="M10 38 L19 38 L24 49"
          stroke={cartColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cart Basket Outline */}
        <path
          d="M21 46 L65 46 L58 72 L28 72 Z"
          fill="none"
          stroke={cartColor}
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Basket Wire Grid Lines */}
        <line x1="24" y1="55" x2="62" y2="55" stroke={cartColor} strokeWidth="2.5" opacity="0.75" />
        <line x1="26" y1="63" x2="59" y2="63" stroke={cartColor} strokeWidth="2.5" opacity="0.75" />
        <line x1="36" y1="46" x2="38" y2="72" stroke={cartColor} strokeWidth="2" opacity="0.6" />
        <line x1="49" y1="46" x2="49" y2="72" stroke={cartColor} strokeWidth="2" opacity="0.6" />

        {/* Cart Chassis Lower Bar */}
        <path
          d="M26 76 L62 76"
          stroke={cartColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Rear Wheel */}
        <circle cx="33" cy="85" r="7" fill="none" stroke={wheelColor} strokeWidth="4" />
        <circle cx="33" cy="85" r="2.5" fill={wheelColor} />

        {/* Front Wheel */}
        <circle cx="56" cy="85" r="7" fill="none" stroke={wheelColor} strokeWidth="4" />
        <circle cx="56" cy="85" r="2.5" fill={wheelColor} />
      </g>
    </svg>
  );
};

export const BuildCartLogo: React.FC<BuildCartLogoProps> = ({
  variant = 'light',
  iconOnly = false,
  showTagline = false,
  customTagline,
  className = '',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 28,
    md: 38,
    lg: 48,
    xl: 60,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  // Text color mapping
  let buildTextColor = '#001440'; // Cetacean Blue
  let cartTextColor = '#FFC30B'; // Mikado Yellow
  let taglineColor = '#475569'; // Slate

  if (variant === 'dark') {
    buildTextColor = '#FFFFFF';
    cartTextColor = '#FFC30B';
    taglineColor = '#CBD5E1';
  } else if (variant === 'yellow') {
    buildTextColor = '#001440';
    cartTextColor = '#001440';
    taglineColor = '#001440';
  } else if (variant === 'black') {
    buildTextColor = '#000000';
    cartTextColor = '#000000';
    taglineColor = '#000000';
  } else if (variant === 'white') {
    buildTextColor = '#FFFFFF';
    cartTextColor = '#FFFFFF';
    taglineColor = '#E2E8F0';
  } else if (variant === 'grayscale') {
    buildTextColor = '#1E293B';
    cartTextColor = '#64748B';
    taglineColor = '#64748B';
  }

  if (iconOnly) {
    return <BuildCartIcon variant={variant} size={iconSizes[size]} className={className} />;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <BuildCartIcon variant={variant} size={iconSizes[size]} />
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight font-['Cabinet_Grotesk'] ${textSizes[size]}`}
          style={{ letterSpacing: '-0.03em' }}
        >
          <span style={{ color: buildTextColor }}>Build</span>
          <span style={{ color: cartTextColor }}>Cart</span>
        </span>
        {showTagline && (
          <span
            className={`font-medium tracking-normal mt-0.5 ${taglineSizes[size]}`}
            style={{ color: taglineColor }}
          >
            {customTagline || 'From Foundation to Finish, We’ve Got You.'}
          </span>
        )}
      </div>
    </div>
  );
};
