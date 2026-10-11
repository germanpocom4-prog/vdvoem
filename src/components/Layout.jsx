import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen pb-28 md:pb-16 md:pt-20">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 md:px-6">{children}</main>
    </div>
  );
}
