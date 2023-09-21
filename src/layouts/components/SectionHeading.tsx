const SectionHeading = ({
  title,
  className,
  dark,
}: {
  title: string;
  dark: boolean;
  className: string;
}) => {
  return (
    <span
      className={[
        " text-center uppercase font-semibold rounded-md px-3 py-2",
        className,
        dark ? "text-white bg-primary" : "text-primary bg-slate-100",
      ].join(" ")}
    >
      {title}
    </span>
  );
};

export default SectionHeading;
