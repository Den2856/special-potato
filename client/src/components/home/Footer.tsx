import React from "react";
import { Link } from "react-router-dom";

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-fire-red text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <img src="/logoW.png" alt="" />
          <div className="text-white/90 text-sm">
            <p>123 Pizza St.</p>
            <p>Manhattan, New York, NY 10001</p>
            <p>United States</p>
          </div>

          <div className="text-white/90 text-sm space-y-1">
            <p>contact@pepper.pizza</p>
            <p>delivery@pepper.pizza</p>
          </div>

          <div className="text-white/90 text-sm space-y-1">
            <p><b>Monday – Friday:</b> 9 AM – 10 PM</p>
            <p><b>Saturday:</b> 10 AM – 11 PM</p>
            <p><b>Sunday:</b> 10 AM – 8 PM</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">MENU</h4>
          <ul className="space-y-2 text-white/90">
            <li><Link to="/" className="hover:opacity-90">Home</Link></li>
            <li><Link to="/menu" className="hover:opacity-90">Our Menu</Link></li>
            <li><Link to="/contact" className="hover:opacity-90">Contact Us</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">USEFUL</h4>
          <ul className="space-y-2 text-white/90">
            <li><Link to="/privacy" className="hover:opacity-90">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="hover:opacity-90">Cookie Policy</Link></li>
            <li><Link to="/terms" className="hover:opacity-90">Terms &amp; Conditions</Link></li>
            <li><Link to="/refunds" className="hover:opacity-90">Refunds &amp; Cancellation</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">SOCIAL</h4>
          <ul className="space-y-2 text-white/90">
            <li><a href="#" className="hover:opacity-90">Instagram</a></li>
            <li><a href="#" className="hover:opacity-90">Trip Advisor</a></li>
            <li><a href="#" className="hover:opacity-90">Youtube</a></li>
            <li><a href="#" className="hover:opacity-90">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-white/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2025 Pepper. All rights reserved.</span>
          <span>Made with ♥</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
