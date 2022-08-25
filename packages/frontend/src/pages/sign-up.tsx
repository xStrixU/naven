import { SignUpPageContent } from '@/components/contents/EntryPagesContents/SignUpPageContent';
import { EntryPageLayout } from '@/components/Layout/EntryPageLayout/EntryPageLayout';

import type { NextPageWithLayout } from './_app';

const SignUpPage: NextPageWithLayout = () => <SignUpPageContent />;

SignUpPage.getLayout = page => (
  <EntryPageLayout title="Sign Up">{page}</EntryPageLayout>
);

export default SignUpPage;
