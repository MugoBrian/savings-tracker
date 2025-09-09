import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-light py-3 mt-auto">
      <div className="container">
        <p className="text-center mb-0 d-flex align-items-center justify-content-center">
          &copy; {new Date().getFullYear()} All rights reserved. Made with
          <FaHeart className="text-danger ms-2" />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
