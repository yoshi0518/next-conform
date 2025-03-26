import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <main>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <h1>Conform Test</h1>
          <div>
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
