export const WEEK_DAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const;

export const WEEK_DAYS_SHORT = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
] as const;

export function getWeekDay(day: number): string {
  return WEEK_DAYS[day];
}

export function getWeekDayShort(day: number): string {
  return WEEK_DAYS_SHORT[day];
}