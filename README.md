# Frontend Standards

Shared coding standards, review rules, and AI review configuration for all frontend projects.

## Purpose

This repo is the **single source of truth** for:
- Coding standards and conventions
- Common anti-pattern rules
- AI code review configuration (used by Mochi 🍡)

## Files

| File | Description |
| --- | --- |
| `coding-standards.md` | TypeScript/React coding rules with severity levels |
| `custom-rules.md` | Team-specific anti-patterns to catch |
| `review-checklist.md` | Quick-reference checklist for PR reviews |
| `prompt-template.md` | AI review prompt template and output formats |

## Usage

### For Developers
- Read `coding-standards.md` + `custom-rules.md` before writing code
- Use `review-checklist.md` as a quick scan before requesting review

### For AI Review (Mochi)
- Mochi reads `coding-standards.md` + `custom-rules.md` from this repo on every review
- Output formats are defined in `prompt-template.md`

## Severity Levels

| Level | Meaning |
| --- | --- |
| `[CRITICAL]` | Must fix before merge |
| `[WARNING]` | Should fix, does not block merge |
| `[INFO]` | Suggestion only, not required |
