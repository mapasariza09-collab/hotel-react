export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function initialsFrom(name: string): string {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'HU'
  );
}

export function nowTimestamp(): string {
  return new Date().toISOString().replace('T', ' ').substring(0, 16);
}

export function randomId(prefix: string, min: number, max: number): string {
  return `${prefix}-${Math.floor(min + Math.random() * (max - min + 1))}`;
}
