export default async function Page({
    params,
  }: {
    params: Promise<{ playerKey: string }>
  }) {
    const playerKey = (await params).playerKey
    return <div>My Post: {playerKey}</div>
  }