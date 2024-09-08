'use client';

import ProgressbarUi from "@/components/ProgressBarUI";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="px-36 mt-16 hidden md:block">
        <ProgressbarUi />
      </section>
      <section className="my-40">{children}</section>
    </>
  );
}
