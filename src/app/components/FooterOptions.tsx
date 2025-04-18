import Link from 'next/link';

export interface FooterOptionProps {
  title: string;
  option: OptionUrl[];
}

export interface OptionUrl {
  url: string;
  name: string;
}

export const FooterOption = ({ title, option }: FooterOptionProps) => {
  return (
    <div className=" flex flex-col gap-4 ">
      <h4 className=" text-lg text-nowrap font-bold text-gray-200">{title}</h4>
      <div className=" gap-4 flex flex-col text-nowrap ">
        {option.map((item, key) => (
          <Link
            href={item.url}
            className=" text-gray-300 hover:text-white "
            key={key}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
