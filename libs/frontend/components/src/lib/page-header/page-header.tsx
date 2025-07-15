export interface PageHeaderProps {
  title: string;
  details: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, details, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{details}</p>
      </div>
      {children && <div className="flex gap-2">{children}</div>}
    </div>
  );
}

export default PageHeader;
