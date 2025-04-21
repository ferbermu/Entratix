import Image from 'next/image';
interface MobileNavButtonProps {
  icon: string;
  onClick: () => void;
  className?: string;
}

export const MobileNavButton = ({
  icon,
  onClick,
  className,
}: MobileNavButtonProps) => {
  return (
    <button
      className={`cursor-pointer px-2 py-2 border border-[#3BAFBB] rounded-lg  ${className}`}
      onClick={onClick}
    >
      <Image
        width={24}
        height={24}
        src={icon}
        alt="Mobile Nav Icon"
        className="w-6 h-6 border"
      />
    </button>
  );
};
