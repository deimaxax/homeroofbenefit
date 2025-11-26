// app/benefitform/layout.tsx - Form page without footer

import Header from '@/components/Header'

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="pt-16"> {/* Header height offset */}
        {children}
      </div>
      {/* No Footer - intentional for lead gen focus */}
    </>
  )
}