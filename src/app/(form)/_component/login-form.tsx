import { Button, Input, Label } from '@/components/ui';

export const LoginForm: React.FC = () => {
  return (
    <div className="rounded-lg border bg-white shadow hover:shadow-md">
      <header className="rounded-t-lg border-b bg-slate-600 p-2 text-xl text-white">Login Form</header>
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            name="email"
            type="email"
          />
          <p className="text-sm text-red-500">Error Message</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            name="password"
            type="password"
          />
          <p className="text-sm text-red-500">Error Message</p>
        </div>
        <Button>ログイン</Button>
      </div>
    </div>
  );
};
