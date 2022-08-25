import { SignInPageContent } from '@/components/contents/EntryPagesContents/SignInPageContent';
import { EntryPageLayout } from '@/components/Layout/EntryPageLayout/EntryPageLayout';

import type { NextPageWithLayout } from './_app';

const SignInPage: NextPageWithLayout = () => <SignInPageContent />;

SignInPage.getLayout = page => (
  <EntryPageLayout title="Sign In">{page}</EntryPageLayout>
);

export default SignInPage;
