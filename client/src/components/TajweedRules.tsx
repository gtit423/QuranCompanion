import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TajweedRule } from "@/types/quran";

const tajweedRules: TajweedRule[] = [
  {
    id: "noon-tanween",
    title: "أحكام النون الساكنة والتنوين",
    description: "الإظهار، الإدغام، الإقلاب، الإخفاء",
    examples: ["مِنْ خَيْرٍ", "مِنْ دُونِ", "مِنْ بَعْدِ", "مِنْ سُوءٍ"],
    category: "أحكام النون"
  },
  {
    id: "meem-sakinah",
    title: "أحكام الميم الساكنة",
    description: "الإخفاء الشفوي، الإدغام الشفوي، الإظهار الشفوي",
    examples: ["هُمْ بِهِ", "لَهُمْ مَا", "أَمْ هُمْ"],
    category: "أحكام الميم"
  },
  {
    id: "mudood",
    title: "المدود",
    description: "المد الطبيعي، المد الفرعي، المد اللازم",
    examples: ["قَالُوا", "جَاءَ", "الضَّالِّينَ", "طَامَّةُ"],
    category: "المدود"
  },
  {
    id: "qalqalah",
    title: "القلقلة",
    description: "اضطراب في الصوت عند النطق بأحرف القلقلة",
    examples: ["قُطْبُ جَدٍّ", "أَحَطْتُ", "وَتَبَّ"],
    category: "صفات الحروف"
  },
  {
    id: "ghunnah",
    title: "الغنة",
    description: "صوت رخيم يخرج من الخيشوم",
    examples: ["مَنْ آمَنَ", "عَنْ نَفْسٍ", "مِنْ نُورٍ"],
    category: "أحكام النون"
  },
  {
    id: "leen",
    title: "اللين",
    description: "خروج الحرف في سهولة ويسر بلا كلفة",
    examples: ["خَوْفٌ", "بَيْتٍ", "شَيْءٍ"],
    category: "صفات الحروف"
  }
];

export function TajweedRules() {
  const [selectedRule, setSelectedRule] = useState<TajweedRule | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
      <h2 className="text-3xl font-bold text-[hsl(135,60%,16%)] mb-8 text-center">أحكام التجويد</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tajweedRules.map((rule) => (
          <Dialog key={rule.id}>
            <DialogTrigger asChild>
              <div className="border-2 border-[hsl(51,100%,42%)] rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer hover:border-[hsl(135,60%,16%)]">
                <div className="text-center mb-4">
                  <div className="bg-[hsl(135,60%,16%)] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-book-open text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-[hsl(135,60%,16%)]">{rule.title}</h3>
                </div>
                <p className="text-gray-600 text-center mb-4">{rule.description}</p>
                <div className="text-center">
                  <span className="text-[hsl(51,100%,42%)] font-semibold">
                    {rule.examples.length} أمثلة
                  </span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[hsl(135,60%,16%)] text-right">
                  {rule.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="text-right">
                  <p className="text-lg text-gray-700 leading-relaxed">{rule.description}</p>
                  <span className="inline-block bg-[hsl(51,100%,42%)]/20 text-[hsl(135,60%,16%)] px-3 py-1 rounded-full text-sm font-semibold mt-2">
                    {rule.category}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-[hsl(135,60%,16%)] mb-4 text-right">أمثلة تطبيقية:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rule.examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="font-amiri text-2xl text-[hsl(135,60%,16%)] mb-2">
                          {example}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[hsl(135,60%,16%)] border-[hsl(135,60%,16%)] hover:bg-[hsl(135,60%,16%)] hover:text-white"
                          onClick={() => {
                            // Create audio for Tajweed examples
                            const utterance = new SpeechSynthesisUtterance(example);
                            utterance.lang = 'ar-SA';
                            utterance.rate = 0.7;
                            speechSynthesis.speak(utterance);
                          }}
                        >
                          <i className="fas fa-play ml-2"></i>
                          استمع
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Featured Example */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-bold text-[hsl(135,60%,16%)] mb-4">مثال تطبيقي: الإظهار</h4>
        <div className="flex items-center justify-between mb-4">
          <div className="font-amiri text-3xl text-[hsl(135,60%,16%)]">
            مِنْ خَيْرٍ
          </div>
          <Button 
            className="bg-[hsl(135,60%,16%)] text-white hover:bg-[hsl(135,40%,35%)]"
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance("مِنْ خَيْرٍ");
              utterance.lang = 'ar-SA';
              utterance.rate = 0.6;
              speechSynthesis.speak(utterance);
            }}
          >
            <i className="fas fa-play ml-2"></i>
            استمع للمثال
          </Button>
        </div>
        <p className="text-gray-700 text-right">
          النون الساكنة قبل حرف الخاء تُظهر بوضوح مع عدم الغنة
        </p>
      </div>
    </div>
  );
}
