import React from 'react';
import { Link } from 'react-router-dom';
import { AlTurkiLawLogo } from './AlTurkiLawLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-right">
          
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <AlTurkiLawLogo className="h-16 w-auto" />
            <p className="text-slate-400 text-sm leading-relaxed">
              مكتب محمد التركي للمحاماة والاستشارات القانونية. شريكك القانوني الموثوق لتحقيق النجاح في بيئة الاستثمار السعودية.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-slate-100">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-300 hover:text-emerald-400 transition">من نحن</Link></li>
              <li><Link to="/services" className="text-slate-300 hover:text-emerald-400 transition">الخدمات</Link></li>
              <li><Link to="/journey" className="text-slate-300 hover:text-emerald-400 transition">رحلتك الاستثمارية</Link></li>
              <li><Link to="/programs" className="text-slate-300 hover:text-emerald-400 transition">البرامج الداعمة</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-slate-100">تواصل معنا</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-1 me-3 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <div>
                  <span className="font-semibold text-slate-100 block">البريد الإلكتروني</span>
                  <a href="mailto:info@alturkilaw.com" className="hover:text-emerald-400 transition">info@alturkilaw.com</a>
                </div>
              </li>
              <li className="flex items-start">
                 <svg className="w-5 h-5 mt-1 me-3 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                 <div>
                  <span className="font-semibold text-slate-100 block">الرياض، السعودية</span>
                  <a href="tel:+966114612733" className="hover:text-emerald-400 transition block" dir="ltr">+966 11 461 2733</a>
                </div>
              </li>
               <li className="flex items-start">
                <svg className="w-5 h-5 mt-1 me-3 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                 <div>
                  <span className="font-semibold text-slate-100 block">بيروت، لبنان</span>
                  <a href="tel:+9613161119" className="hover:text-emerald-400 transition block" dir="ltr">+961 3 161119</a>
                </div>
              </li>
            </ul>
          </div>
          
           {/* Column 4: Social Media */}
           <div>
             <h3 className="text-lg font-bold mb-4 text-slate-100">تابعنا</h3>
             <p className="text-slate-400 text-sm mb-4 leading-relaxed">
               ابق على اطلاع بآخر المستجدات القانونية والاستثمارية.
             </p>
             <div className="flex space-i-4">
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition" aria-label="X/Twitter"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition" aria-label="LinkedIn"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition" aria-label="Facebook"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition" aria-label="Instagram"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"></path></svg></a>
             </div>
           </div>

        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} مكتب محمد التركي للمحاماة والاستشارات القانونية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;