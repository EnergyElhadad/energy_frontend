export function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-white rounded-lg shadow-sm px-12 py-8 @max-sm:p-4 ">
      {children}
    </div>
  );
}
