import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import AdminReturnBar from '@/components/shared/AdminReturnBar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      <Footer />
      <AdminReturnBar />
    </div>
  )
}
