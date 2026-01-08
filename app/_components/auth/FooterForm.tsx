import Link from "next/link";

export default function FooterForm({title,linkurl,linktext}: {title:string,linkurl:string,linktext:string }) {
    return (
         <p className="text-sm text-center mt-6 text-singleGray font-normal @max-sm:text-xs @max-sm:mt-4">
        {title}
        <Link
          href={linkurl}
          className="text-primary font-medium hover:underline ms-2 @max-sm:text-xs"
        >
            {linktext}
        </Link>
      </p>
    );
}