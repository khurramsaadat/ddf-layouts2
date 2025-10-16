import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Specifications',
};

export default function LayoutDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
