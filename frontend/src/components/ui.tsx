import type { ReactNode } from "react";

type Weight = "normal" | "medium" | "semibold" | "bold";
type Tone =
  | "ink"
  | "secondary"
  | "tertiary"
  | "accent"
  | "inverse"
  | "dark"
  | "success"
  | "warning"
  | "danger"
  | "placeholder";

const TONE: Record<Tone, string> = {
  ink: "text-ink",
  secondary: "text-ink-secondary",
  tertiary: "text-ink-tertiary",
  accent: "text-accent",
  inverse: "text-[#FCFCFC]",
  dark: "text-[#18181B]",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  placeholder: "text-[#8A93A8]",
};

const WEIGHT: Record<Weight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function T({
  s = 14,
  w = "normal",
  tone = "ink",
  lh,
  className = "",
  children,
}: {
  s?: number;
  w?: Weight;
  tone?: Tone;
  lh?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${WEIGHT[w]} ${TONE[tone]} ${className}`}
      style={{ fontSize: s, lineHeight: lh ? `${lh}` : undefined }}
    >
      {children}
    </div>
  );
}

type ChipTone = "accent" | "success" | "warning" | "soft" | "accentSoft" | "dangerSoft";

const CHIP: Record<ChipTone, string> = {
  accent: "bg-accent text-[#FCFCFC]",
  success: "bg-success text-[#18181B]",
  warning: "bg-warning text-[#18181B]",
  soft: "bg-soft text-ink",
  accentSoft: "bg-accent-soft text-accent",
  dangerSoft: "bg-[#EE212E26] text-danger",
};

export function Chip({
  tone = "soft",
  className = "",
  children,
}: {
  tone?: ChipTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex h-fit w-fit shrink-0 flex-row items-center gap-[2px] rounded-[16px] px-[8px] py-[2px] ${CHIP[tone]} ${className}`}
    >
      <div className="text-[12px] font-medium whitespace-nowrap">{children}</div>
    </div>
  );
}

type BtnVariant = "primary" | "ghost" | "outline" | "danger" | "soft";

const BTN: Record<BtnVariant, string> = {
  primary: "bg-accent text-[#FCFCFC] hover:bg-accent-hover",
  ghost: "text-ink hover:bg-soft",
  outline: "border border-line bg-white text-ink hover:bg-soft",
  danger: "bg-danger text-[#FCFCFC] hover:bg-[#D31822]",
  soft: "bg-accent-soft text-accent hover:bg-[#2158BE33]",
};

export function Btn({
  variant = "primary",
  h = 36,
  px = 16,
  className = "",
  icon,
  children,
  onClick,
  disabled,
}: {
  variant?: BtnVariant;
  h?: number;
  px?: number;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex shrink-0 cursor-pointer flex-row items-center justify-center gap-[8px] rounded-[24px] text-[14px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${BTN[variant]} ${className}`}
      style={{ height: h, paddingLeft: px, paddingRight: px }}
    >
      {icon}
      {children}
    </button>
  );
}

export function Input({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`h-[40px] w-full rounded-[12px] bg-white px-[12px] text-[14px] text-ink shadow-[0px_1px_2px_0px_#0000000F] outline-none placeholder:text-[#8A93A8] focus:ring-2 focus:ring-accent/40 ${className}`}
    />
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-[4px]">
      <div className="text-[14px] font-medium text-ink">{label}</div>
      {children}
      {hint && <div className="px-[4px] text-[12px] text-ink-secondary">{hint}</div>}
    </div>
  );
}

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex shrink-0 flex-col bg-white shadow-[0px_2px_4px_0px_#0000000A] ${className}`}
    >
      {children}
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <div className={`h-[1px] w-full shrink-0 bg-line ${className}`} />;
}

export function StatusChip({ status }: { status: string }) {
  const map: Record<string, { tone: ChipTone; label: string }> = {
    RASCUNHO: { tone: "soft", label: "Rascunho" },
    RECEBIDA: { tone: "accentSoft", label: "Recebida" },
    EM_ANALISE: { tone: "accentSoft", label: "Em análise" },
    PENDENTE_DOCUMENTOS: { tone: "warning", label: "Pendente" },
    APROVADA: { tone: "success", label: "Aprovada" },
    INDEFERIDA: { tone: "dangerSoft", label: "Indeferida" },
  };
  const s = map[status] ?? { tone: "soft" as ChipTone, label: status };
  return <Chip tone={s.tone}>{s.label}</Chip>;
}
