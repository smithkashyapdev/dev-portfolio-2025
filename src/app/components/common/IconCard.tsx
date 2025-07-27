'use client';
import Image from 'next/image';

type IconCardProps = {
  title?: string;
  titleColor?: string;
  enableSrc?: string;
  disableSrc?: string;
  isHovered?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  handleMouseLeave?: () => void;
};

const Item = ({
  title,
  titleColor,
  enableSrc,
  disableSrc,
  isHovered,
  onClick,
  onMouseEnter,
  handleMouseLeave,
}: IconCardProps) => {
  return (
    <div className="transition delay-150 duration-300 ease-in-out hover:-translate-y-2 p-[2px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-full"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
       <div className="bg-[var(--foreground)] content-center text-center rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 w-full h-full">
        {enableSrc || disableSrc ? (
        <Image
          src={(isHovered ? enableSrc : disableSrc) || ''}
          alt="Dot Dev Icon"
          width={20}
          height={20}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      ) : null}
      <span
        className={`text-2xl font-semibold text-${titleColor || ''} group-hover:text-purple-500 transition-colors duration-300`}
      >
        {title || 'Default Title'}
      </span>
      </div>
    </div>
  );
};

export { Item as IconCard };
