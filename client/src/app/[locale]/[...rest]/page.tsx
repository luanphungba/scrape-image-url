import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'notfound',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const NotFoundPage = () => {
  return <>
    <div>not found!!!</div>
  </>
}

export default NotFoundPage;
