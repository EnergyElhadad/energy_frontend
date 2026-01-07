export function HeaderForm({title,subtitle}:Readonly<{title:string;subtitle:string}>) {
  return (
    <>
       <h1 className="text-xl  text-center mb-2 font-semibold @max-sm:text-[1.125rem]">
         {title}
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6 font-normal @max-sm:text-[0.875rem]">
       {subtitle}
        </p>
    </>
  );
}

