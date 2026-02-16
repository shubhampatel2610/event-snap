import Link from "next/link";

const Header = () => {
  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-background/10 backdrop-blur-xl z-20 border-b">
        <div className="mx-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <div>EventSnap</div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
