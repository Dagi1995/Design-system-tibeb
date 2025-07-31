// This file mocks Next.js `useRouter` from `next/navigation` for Storybook
export const useRouter = () => ({
  push: (path: string) => console.log("Mock router push to:", path),
  replace: (path: string) => console.log("Mock router replace to:", path),
  refresh: () => {},
  back: () => {},
  forward: () => {},
  prefetch: () => Promise.resolve(),
});
