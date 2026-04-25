import Footer from "../ui/footer";
import Header from "../ui/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center text-background gap-3 bg-gradient-to-r from-cyan-500 to-blue-500">
        {children}
      </div>
      <Footer />
    </>
  );
}
