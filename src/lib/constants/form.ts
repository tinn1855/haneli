export const SEX_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

/** Stable current year for SSR/hydration (avoids Date mismatch). Update yearly if needed. */
export const CURRENT_YEAR = 2025

export function getMaxDate(): Date {
  return new Date(new Date().setFullYear(new Date().getFullYear() - 13))
}

export function getMinBirthYear(): number {
  return 1900
}
