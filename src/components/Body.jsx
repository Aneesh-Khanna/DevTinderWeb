import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Body;
