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
    <button className={`px-6 py-2  ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};
