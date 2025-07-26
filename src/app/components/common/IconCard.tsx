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
    <div
      className="group relative flex flex-row items-center gap-2 border-b py-2 hover:bg-[#f0f0ff] hover:border-purple-400 hover:shadow-md transition-all duration-200 cursor-pointer select-none"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
        className={`text-xl font-semibold text-${titleColor || ''} group-hover:text-purple-500 transition-colors duration-300`}
      >
        {title || 'Default Title'}
      </span>
    </div>
  );
};

export { Item as IconCard };
