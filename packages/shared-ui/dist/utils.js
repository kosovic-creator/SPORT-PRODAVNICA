// Simple utility for className merging (tailwind-merge or clsx can be used for more advanced cases)
export function cn(...args) {
    return args.filter(Boolean).join(" ");
}
