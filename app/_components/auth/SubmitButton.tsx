export function SubmitButton({text}: {text:string}) {
  return (
    <button className="w-full bg-primary hover:bg-primary text-white font-bold py-2.5 rounded-sm transition text-[1rem] cursor-pointer @max-sm:text-sm">
       {text}
      </button>
  );
}