// Simple utility for className merging (tailwind-merge or clsx can be used for more advanced cases)
export function cn(...args: (string | undefined | false | null)[]) {
  return args.filter(Boolean).join(" ");
}
