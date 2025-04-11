import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">Conform Test Index</h1>
      <div>
        <Link
          href="/form1"
          className="text-blue-500 underline underline-offset-2"
        >
          ログイン
        </Link>
      </div>
      <div>
        <Link
          href="/form2"
          className="text-blue-500 underline underline-offset-2"
        >
          確認ダイアログあり
        </Link>
      </div>
      <div>
        <Link
          href="/form3"
          className="text-blue-500 underline underline-offset-2"
        >
          Input
        </Link>
      </div>
      <div>
        <Link
          href="/form4"
          className="text-blue-500 underline underline-offset-2"
        >
          Textarea
        </Link>
      </div>
      <div>
        <Link
          href="/form5"
          className="text-blue-500 underline underline-offset-2"
        >
          Select
        </Link>
      </div>
      <div>
        <Link
          href="/form6"
          className="text-blue-500 underline underline-offset-2"
        >
          Checkbox
        </Link>
      </div>
      <div>
        <Link
          href="/form7"
          className="text-blue-500 underline underline-offset-2"
        >
          Radio
        </Link>
      </div>
      <div>
        <Link
          href="/form8"
          className="text-blue-500 underline underline-offset-2"
        >
          Switch
        </Link>
      </div>
    </div>
  );
};
export default Home;
