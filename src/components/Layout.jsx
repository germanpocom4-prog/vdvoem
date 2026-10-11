import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen pb-24 md:pb-12 md:pt-20">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 md:px-6">{children}</main>
    </div>
  );
}