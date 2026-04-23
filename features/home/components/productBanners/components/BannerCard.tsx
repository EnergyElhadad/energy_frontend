import Image from 'next/image';

type Props = {
  title: string;
  descritption: string;
  textLink: string;
  urlImage: string;
  mobileUrlImage?: string;
  link?: string;
};

export const BannerCard: React.FC<Props> = ({ title, descritption, textLink, urlImage, mobileUrlImage, link }) => {
  const content = (
    <div className="overflow-hidden rounded-sm" aria-label="banner">
      <div className="relative z-2 flex min-h-57.25 w-full max-w-147 items-center">
        {mobileUrlImage ? (
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileUrlImage} />
            <source media="(min-width: 768px)" srcSet={urlImage} />
            <Image src={urlImage} fill alt="banner" className="absolute inset-0 h-full w-full object-cover ltr:-scale-x-100" />
          </picture>
        ) : (
          <Image src={urlImage} fill alt="banner" className="absolute inset-0 h-full w-full object-cover ltr:-scale-x-100" />
        )}

        <div className="relative z-10 space-y-2 px-8 py-6 text-start">
          <h4 className="text-[1rem] font-normal text-[#EEEEEE]">{title}</h4>
          {descritption && <p className="mb-4 text-2xl font-medium text-white">{descritption}</p>}
          {textLink && <p className="text-base font-medium text-white">{textLink}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <article className="w-full max-w-147">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  );
};
