import { useSearchParams,useRouter } from "next/navigation";


export const useOrderingFilter= ()=>{
      const router = useRouter();
  const searchParams = useSearchParams();
  const currentOrdering = searchParams.get('ordering') || 'id';

  const updateOrdering = (ordering: 'id' | '-id') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('ordering', ordering);
    router.push(`?${params.toString()}`);
  };

  return{currentOrdering, updateOrdering}
}