export function AuthLayout({
  children,
}: Readonly<{   
    children: React.ReactNode;
}>) {
    return (
        <div
            className="w-full bg-white rounded-lg shadow-sm p-12 max-w-147 @max-sm:p-4  mx-auto"
        >
            {children}
        </div>
    );
}   