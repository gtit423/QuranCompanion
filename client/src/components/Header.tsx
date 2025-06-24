import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";

export function Header() {
  const { isEnabled, requestPermission } = useNotifications();

  const handleNotificationRequest = async () => {
    if (!isEnabled) {
      await requestPermission();
    }
  };

  return (
    <header className="bg-[hsl(135,60%,16%)] shadow-lg relative overflow-hidden">
      <div className="islamic-pattern absolute inset-0 opacity-20"></div>
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-4">
            <div className="text-[hsl(51,100%,42%)] text-4xl">
              <i className="fas fa-moon"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-amiri">القرآن الكريم</h1>
              <p className="text-[hsl(51,100%,42%)] text-sm">المصحف الشريف الكامل</p>
            </div>
          </div>
          <div className="flex items-center space-x-reverse space-x-4">
            <Button
              onClick={handleNotificationRequest}
              disabled={isEnabled}
              className="bg-[hsl(51,100%,42%)] text-[hsl(135,60%,16%)] hover:bg-yellow-400 font-semibold"
            >
              <i className="fas fa-bell ml-2"></i>
              {isEnabled ? "مفعل" : "تفعيل التنبيهات"}
            </Button>
            <button className="text-white hover:text-[hsl(51,100%,42%)] transition-colors">
              <i className="fas fa-cog text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
