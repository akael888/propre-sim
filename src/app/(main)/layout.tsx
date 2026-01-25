import Footer from "../ui/footer";
import Header from "../ui/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> */}
      {children}
      <Footer />
    </>
  );
}
