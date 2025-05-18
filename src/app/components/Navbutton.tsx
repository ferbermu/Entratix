export const Navbutton = ({
  text,
  onClick,
  className,
}: {
  className?: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={`px-6 py-2 cursor-pointer  ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
