import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Locale } from '@/navigation';


type MetaFactoryOptions = {
  namespace: string;               
  baseUrl: string;               
  routePath: string;            
  siteName?: string;          
  imagePath?: string;             
  locales?: Locale[];            
  baseUrlPerLocale?: Partial<Record<Locale, string>>;
};

export function makeGenerateMetadata(opts: MetaFactoryOptions) {
  const {
    namespace,
    baseUrl,
    routePath,
    siteName = 'ArmLight',
    imagePath = '/og-image.jpg',
    locales = ['hy', 'en', 'ru'],
    baseUrlPerLocale,
  } = opts;

  return async function generateMetadata({
    params: { locale },
  }: {
    params: { locale: Locale };
  }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    const ns = `${namespace}.metadata`;
    const title = t(`${ns}.TITLE`);
    const description = t(`${ns}.DESCRIPTION`);
    const currentBase = baseUrlPerLocale?.[locale] ?? baseUrl;
    const canonical = `${currentBase}${routePath}`;

    const alternatesLanguages = locales.reduce<Record<string, string>>((acc, l) => {
      const lBase = baseUrlPerLocale?.[l] ?? baseUrl;
      const localizedPath = routePath === '/' ? `/${l}` : `/${l}${routePath}`;
      acc[l] = `${lBase}${localizedPath}`;
      return acc;
    }, {});

    return {
      title,
      description,
      alternates: {
        canonical,
        languages: alternatesLanguages,
      },
      // openGraph: {
      //   title: ogTitle,
      //   url: canonical,
      //   siteName,
      //   type: 'website',
      //   images: [
      //     {
      //       url: `${currentBase}${imagePath}`,
      //       width: 1200,
      //       height: 630,
      //       alt: ogTitle,
      //     },
      //   ],
      // },
    };
  };
}
