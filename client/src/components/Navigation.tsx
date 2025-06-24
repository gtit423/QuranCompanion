interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const sections = [
    { id: "quran", label: "القرآن الكريم", icon: "fas fa-book-open" },
    { id: "prayer-times", label: "أوقات الصلاة", icon: "fas fa-clock" },
    { id: "tajweed", label: "أحكام التجويد", icon: "fas fa-graduation-cap" },
    { id: "bookmarks", label: "المفضلة", icon: "fas fa-bookmark" },
  ];

  return (
    <nav className="bg-white shadow-md border-b-2 border-[hsl(51,100%,42%)]">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-reverse space-x-8 py-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`transition-colors pb-1 ${
                activeSection === section.id
                  ? "text-[hsl(135,60%,16%)] font-semibold border-b-2 border-[hsl(135,60%,16%)]"
                  : "text-gray-600 hover:text-[hsl(135,60%,16%)]"
              }`}
            >
              <i className={`${section.icon} ml-2`}></i>
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
