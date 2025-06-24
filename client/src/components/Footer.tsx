export function Footer() {
  return (
    <footer className="bg-[hsl(135,60%,16%)] text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[hsl(51,100%,42%)]">القرآن الكريم</h3>
            <p className="text-sm leading-relaxed">
              موقع شامل لقراءة القرآن الكريم مع التلاوة الصوتية وأوقات الصلاة وأحكام التجويد
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط مفيدة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[hsl(51,100%,42%)] transition-colors">
                  عن الموقع
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[hsl(51,100%,42%)] transition-colors">
                  اتصل بنا
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[hsl(51,100%,42%)] transition-colors">
                  سياسة الخصوصية
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="text-white hover:text-[hsl(51,100%,42%)] transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-[hsl(51,100%,42%)] transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-[hsl(51,100%,42%)] transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[hsl(135,40%,35%)] mt-8 pt-4 text-center text-sm">
          <p>&copy; 2024 القرآن الكريم. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
