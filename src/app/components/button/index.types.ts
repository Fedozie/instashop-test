export enum ButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant: keyof typeof ButtonVariants;
  label: string | undefined;
  buttonType?: "button" | "submit" | "reset" | undefined;
  customClassName?: string;
}