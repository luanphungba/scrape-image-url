import { getTranslations } from 'next-intl/server';
import SignIn from '@/components/organisms/SignIn';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'signIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignInPage = () => {
  return <SignIn />
}

export default SignInPage;
