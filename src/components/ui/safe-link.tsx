"use client";

import * as React from "react";
import Link from "next/link";

/**
 * Link wrapper that strips the `asChild` prop so it never reaches the DOM.
 * Use this when Link is the direct child of a Radix component with asChild
 * (e.g. Button asChild, DropdownMenuItem asChild) to avoid the React warning.
 */
const SafeLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link> & { asChild?: boolean }
>(function SafeLink({ asChild: _asChild, ...props }, ref) {
  return <Link ref={ref} {...props} />;
});

export { SafeLink };
