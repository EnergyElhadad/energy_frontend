interface ProductInfoProps {
  description: string;
}

export const ProductInfo = ({ description }: ProductInfoProps) => {
  return (
    <p
      className="text-darkGray mt-4 text-base"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};
