
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useTheme } from "../context/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative w-10 h-10">
          {/* Sun Icon (Light Mode) */}
          <div className="absolute transition-all dark:opacity-0 dark:scale-0 opacity-100 scale-100">
            <Sun className="h-6 w-6 text-black" aria-hidden="true" />
          </div>
          {/* Moon Icon (Dark Mode) */}
          <div className="absolute transition-all opacity-0 scale-0 dark:opacity-100 dark:scale-100">
            <Moon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
