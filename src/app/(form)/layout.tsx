import Link from 'next/link';

const FormLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="space-y-2">
      <div>{children}</div>
      <div className="text-center">
        <Link
          href="/"
          className="text-blue-500 underline underline-offset-2"
        >
          Top
        </Link>
      </div>
    </div>
  );
};

export default FormLayout;
