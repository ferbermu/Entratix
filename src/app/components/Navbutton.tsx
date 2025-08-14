export const Navbutton = ({
  text,
  onClick,
  className,
  icon,
}: {
  className?: string;
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
}) => {
  return (
    <button
      className={`px-6 py-2 cursor-pointer flex items-center gap-2 rounded-md border border-transparent ${className}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};
