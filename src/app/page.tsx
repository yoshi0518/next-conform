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
          確認画面なし
        </Link>
      </div>
      <div>
        <Link
          href="/form2"
          className="text-blue-500 underline underline-offset-2"
        >
          確認画面あり
        </Link>
      </div>
    </div>
  );
};
export default Home;
