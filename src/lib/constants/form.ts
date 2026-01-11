export const SEX_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

export function getMaxDate(): Date {
  return new Date(new Date().setFullYear(new Date().getFullYear() - 13))
}

export function getMinBirthYear(): number {
  return 1900
}
