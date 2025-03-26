import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">Conform Test Index</h1>
      <div>
        <Link
          href="/login"
          className="text-blue-500 underline underline-offset-2"
        >
          Login Form
        </Link>
      </div>
      <div>
        <Link
          href="/form1"
          className="text-blue-500 underline underline-offset-2"
        >
          Form1
        </Link>
      </div>
      <div>
        <Link
          href="/form2"
          className="text-blue-500 underline underline-offset-2"
        >
          Form2
        </Link>
      </div>
      <div>
        <Link
          href="/form3"
          className="text-blue-500 underline underline-offset-2"
        >
          Form3
        </Link>
      </div>
      <div>
        <Link
          href="/form4"
          className="text-blue-500 underline underline-offset-2"
        >
          Form4
        </Link>
      </div>
      <div>
        <Link
          href="/form5"
          className="text-blue-500 underline underline-offset-2"
        >
          Form5
        </Link>
      </div>
    </div>
  );
};
export default Home;
