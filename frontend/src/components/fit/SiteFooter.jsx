import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 text-[13px] sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center border border-ink-border font-display text-[11px] font-semibold">
              Fit
            </span>
            <span className="font-display text-sm font-semibold">Sight</span>
          </div>
          <p className="mt-4 max-w-[220px] leading-relaxed text-ink-muted">
            AI-powered training with a Smart Mirror that sees every rep.
          </p>
        </div>
        <div>
          <p className="mb-3 font-display font-semibold">Menu</p>
          <ul className="space-y-1.5 text-ink-muted">
            <li><Link to="/workouts" className="hover:text-primary">Workouts</Link></li>
            <li><Link to="/progress" className="hover:text-primary">Progress</Link></li>
            <li><Link to="/history" className="hover:text-primary">History</Link></li>
            <li><Link to="/diet" className="hover:text-primary">Diet Plan</Link></li>
            <li><Link to="/coaches" className="hover:text-primary">Coach Sessions</Link></li>
            <li><Link to="/settings" className="hover:text-primary">Settings</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display font-semibold">Contact Us</p>
          <ul className="space-y-1.5 text-ink-muted">
            <li>500 Training Ave</li>
            <li>San Francisco, CA 94158</li>
            <li>hello@fitsight.app</li>
            <li>Tel: 123-456-7890</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display font-semibold">Coaching Hours</p>
          <ul className="space-y-1.5 text-ink-muted">
            <li>Sun–Fri: 7AM to 10PM</li>
            <li>Saturday: 9AM to 7PM</li>
          </ul>
         <div className="mt-4 flex gap-3">
  <FaFacebookF
    className="h-4 w-4 cursor-pointer hover:text-primary"
    aria-label="Facebook"
  />

  <FaInstagram
    className="h-4 w-4 cursor-pointer hover:text-primary"
    aria-label="Instagram"
  />

  <FaYoutube
    className="h-4 w-4 cursor-pointer hover:text-primary"
    aria-label="YouTube"
  />
</div>
        </div>
      </div>
      <div className="bg-primary py-3 text-center text-[11px] text-primary-foreground">
        © 2026 by FitSight. Train smart, move better.
      </div>
    </footer>
  );
}