# Next.js Template

- Next.js 15
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- Husky
- lint-staged

## How to Use

### 開発環境

```bash
# パッケージをインストール
$ pnpm install

# 環境変数(.env)を準備
$ cp .env.sample .env

# 開発サーバー起動
$ pnpm dev

# ビルド・本番サーバー起動
$ pnpm build
$ pnpm start

# Lint
$ pnpm lint
$ pnpm lint:fix

# Format
$ pnpm fmt
$ pnpm fmt:fix

# Typecheck
$ pnpm typecheck

# Storybook
$ pnpm storybook
```

### 自動デプロイ設定

1. VercelでGithubリポジトリ連携でデプロイ

2. GithubリポジトリでSecretsを設定

Settings => Secrets and variables => Actions => New repository secret

| Name              | Secret               |
| ----------------- | -------------------- |
| VERCEL_ORG_ID     | Vercelから取得した値 |
| VERCEL_PROJECT_ID | Vercelから取得した値 |
| VERCEL_TOKEN      | Vercelから取得した値 |
| ENV_PROD          | prod                 |
| ENV_DEV           | dev                  |
| DEBUG_PROD        | false                |
| DEBUG_DEV         | true                 |

3. VercelのGithubリポジトリ連携を解除

4. GithubActionsデプロイをRe-run all jobsで実行

## 参考

- GitHub Actions で継続的デリバリー<br> https://zenn.dev/hayato94087/books/6a55108faa37ba/viewer/h030ni8p32akv6p4
