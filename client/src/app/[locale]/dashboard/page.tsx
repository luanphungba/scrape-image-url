import { getTranslations } from 'next-intl/server';
import MediaList from '@/components/organisms/MediaList';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'media',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignInPage = () => {
  return <MediaList />
}

export default SignInPage;
