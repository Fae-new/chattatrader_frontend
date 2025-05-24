import * as React from "react";
import { OTPInput, OTPInputContext, type OTPInputProps } from "input-otp";
import { Minus } from "lucide-react";
import { cn } from "../lib/utils";

// InputOTP
type InputOTPProps = OTPInputProps & {
  className?: string;
  containerClassName?: string;
};

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      onKeyDown={(e) => {
        // Allow letters and numbers, plus navigation keys
        if (
          !/^[a-zA-Z0-9]$/.test(e.key) &&
          e.key !== "Backspace" &&
          e.key !== "Delete" &&
          e.key !== "ArrowLeft" &&
          e.key !== "ArrowRight" &&
          e.key !== "Tab"
        ) {
          e.preventDefault();
        }
      }}
      {...props}
    />
  )
);
InputOTP.displayName = "InputOTP";

// InputOTPGroup
type InputOTPGroupProps = React.HTMLAttributes<HTMLDivElement>;

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
);
InputOTPGroup.displayName = "InputOTPGroup";

// InputOTPSlot
type InputOTPSlotProps = React.HTMLAttributes<HTMLDivElement> & {
  index: number;
};

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
          isActive && "z-10 ring-1 ring-ring",
          className
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

// InputOTPSeparator
type InputOTPSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  (props, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Minus />
    </div>
  )
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };