import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor, Palette } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface ThemeToggleProps {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

const ThemeToggle = ({ 
  variant = "ghost", 
  size = "sm",
  showLabel = false 
}: ThemeToggleProps) => {
  const { theme, actualTheme, setLightMode, setDarkMode, setSystemMode } = useTheme();

  const getThemeIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-4 h-4" />;
    }
    return actualTheme === 'dark' 
      ? <Moon className="w-4 h-4" /> 
      : <Sun className="w-4 h-4" />;
  };

  const getThemeLabel = () => {
    if (theme === 'system') return 'System';
    return actualTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className="flex items-center space-x-2"
        >
          {getThemeIcon()}
          {showLabel && <span>{getThemeLabel()}</span>}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          onClick={setLightMode}
          className={`flex items-center space-x-2 cursor-pointer ${theme === 'light' ? 'bg-accent' : ''}`}
        >
          <Sun className="w-4 h-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={setDarkMode}
          className={`flex items-center space-x-2 cursor-pointer ${theme === 'dark' ? 'bg-accent' : ''}`}
        >
          <Moon className="w-4 h-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={setSystemMode}
          className={`flex items-center space-x-2 cursor-pointer ${theme === 'system' ? 'bg-accent' : ''}`}
        >
          <Monitor className="w-4 h-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Simple toggle button version (cycles through themes)
export const SimpleThemeToggle = ({ 
  variant = "ghost", 
  size = "sm" 
}: Omit<ThemeToggleProps, 'showLabel'>) => {
  const { toggleTheme, actualTheme, theme } = useTheme();

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-4 h-4" />;
    }
    return actualTheme === 'dark' 
      ? <Sun className="w-4 h-4" /> 
      : <Moon className="w-4 h-4" />;
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={toggleTheme}
      className="transition-all duration-300 hover:scale-105"
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

// Theme palette component for settings
export const ThemePalette = () => {
  const { theme, setLightMode, setDarkMode, setSystemMode } = useTheme();

  const themes = [
    {
      name: 'Light',
      value: 'light',
      icon: Sun,
      preview: 'bg-white border-2',
      handler: setLightMode
    },
    {
      name: 'Dark',
      value: 'dark',
      icon: Moon,
      preview: 'bg-slate-900 border-2',
      handler: setDarkMode
    },
    {
      name: 'System',
      value: 'system',
      icon: Monitor,
      preview: 'bg-gradient-to-r from-white to-slate-900 border-2',
      handler: setSystemMode
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Theme Preference</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isSelected = theme === themeOption.value;
          
          return (
            <button
              key={themeOption.value}
              onClick={themeOption.handler}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                isSelected 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${themeOption.preview} ${
                isSelected ? 'border-primary' : 'border-border'
              }`} />
              <div className="flex flex-col items-center">
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-xs font-medium">{themeOption.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeToggle;
