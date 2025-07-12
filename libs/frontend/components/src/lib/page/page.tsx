export interface PageProps {
  children: React.ReactNode;
}
export function Page({ children }: PageProps) {
  return <div className="space-y-6">{children}</div>;
}

export default Page;
