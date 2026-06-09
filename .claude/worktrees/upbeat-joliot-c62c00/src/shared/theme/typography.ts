// Typography tokens for consistent text styling

export const TYPOGRAPHY = {
  // Headers
  header: {
    fontSize: 24,
    fontWeight: '800' as const,
    lineHeight: 32,
  },

  // Subheaders
  subheader: {
    fontSize: 18,
    fontWeight: '700' as const,
    lineHeight: 26,
  },

  // Kickers (uppercase labels)
  kicker: {
    fontSize: 12,
    fontWeight: '700' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
    lineHeight: 16,
  },

  // Body text (regular)
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 24,
  },

  // Body text (semibold)
  bodySemibold: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 24,
  },

  // Metadata / small text
  metadata: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },

  // Caption / smallest text
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },

  // Button text
  button: {
    fontSize: 12,
    fontWeight: '700' as const,
    lineHeight: 16,
  },

  // Code / monospace
  code: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
} as const;
