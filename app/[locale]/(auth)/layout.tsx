const layout = async ({ children }: { children: React.ReactNode }) => {
  return <main className="bg-Background flex min-h-screen w-full justify-center pt-30">{children}</main>;
};

export default layout;
