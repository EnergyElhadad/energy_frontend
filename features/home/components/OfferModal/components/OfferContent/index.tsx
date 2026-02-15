import { AvailableQuantities } from './components/AvailableQuantities';
import { Descriptions } from './components/Descriptions';
import { FooterOffer } from './components/FooterOffer';
import { OfferTitle } from './components/OfferTitle';
import { Quantity } from './components/Quantity';
import { Reviews } from './components/Reviews';

type OfferContent = {
  title: string;
  linkUrl: string;
  description: string;
  price: string;
};

export const OfferContent: React.FC<OfferContent> = ({ title, linkUrl, description, price }) => {
  return (
    <>
      <OfferTitle title={title} />
      <AvailableQuantities />
      <Reviews />
      <Descriptions description={description} />
      <Quantity price={price} />
      <FooterOffer linkUrl={linkUrl} />
    </>
  );
};
