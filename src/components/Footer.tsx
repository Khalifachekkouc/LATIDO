import Link from "next/link";
import { MapPin, Phone, ExternalLink } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-4 border-yellow pb-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b-2 border-yellow/30 pb-10">
          {/* Brand */}
          <div>
            <h2
              className="text-5xl font-black text-yellow leading-none mb-3"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              LATIDO
            </h2>
            <p className="font-mono text-sm text-gray-400 leading-relaxed">
              Fast food con ritmo.
              <br />
              Every bite drops a beat.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="w-2 h-2 rounded-full bg-yellow animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-yellow/60 animate-pulse delay-100" />
              <span className="w-2 h-2 rounded-full bg-yellow/30 animate-pulse delay-200" />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-black uppercase text-yellow mb-4 text-sm tracking-widest">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0631303131"
                  className="flex items-center gap-3 font-mono text-sm text-gray-300 hover:text-yellow transition-colors group"
                >
                  <Phone size={16} className="text-yellow" />
                  <span>0631 30 31 31</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-sm text-gray-300 hover:text-yellow transition-colors"
                >
                  <InstagramIcon size={16} className="text-yellow" />
                  <span>@latido.official</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/212631303131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-sm text-gray-300 hover:text-yellow transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-black uppercase text-yellow mb-4 text-sm tracking-widest">Location</h3>
            <div className="flex gap-3 mb-3">
              <MapPin size={16} className="text-yellow mt-0.5 shrink-0" />
              <p className="font-mono text-sm text-gray-300 leading-relaxed">
                794 LOT KARAQUYEN<br />
                RTE AIN CHKEF<br />
                FES, 30070
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=794+LOT+KARAQUYEN+RTE+AIN+CHKEF+FES"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow text-black font-black uppercase text-xs px-4 py-2 border-2 border-yellow hover:bg-black hover:text-yellow transition-colors mt-2"
            >
              <ExternalLink size={12} />
              Open in Maps
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6">
          <p className="text-gray-600 font-mono text-xs">
            © {new Date().getFullYear()} LATIDO. All rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="text-gray-700 hover:text-yellow font-mono text-xs transition-colors"
          >
            Admin →
          </Link>
        </div>
      </div>
    </footer>
  );
}
