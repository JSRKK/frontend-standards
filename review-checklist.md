# Code Review Checklist

> Version: 2.0
> Purpose: Quick-reference checklist for PR reviews
> Used with: coding-standards.md + custom-rules.md

**Usage:**
- AI uses this as a final pass after reviewing against standards + custom rules
- Developers use this as a quick scan before approving a PR
- ✅ Pass | ❌ Fail | ➖ N/A

---

## TypeScript & Types [CRITICAL]

- [ ] No `any` type → Custom-1
- [ ] Uninitialized variables have type annotations → Rule 1.2
- [ ] Functions have return types → Rule 2.1
- [ ] Uses `T[]` not `Array<T>` → Rule 4.1
- [ ] No `@ts-ignore` / `@ts-nocheck` without explanatory comment

## Naming [CRITICAL]

- [ ] Variables/functions use camelCase → Rule 7.1
- [ ] Booleans have is/has/should prefix → Rule 6.3
- [ ] Constants use UPPER_SNAKE_CASE → Rule 6.2
- [ ] Components use PascalCase → Rule 7.3
- [ ] Props types end with `Props` → Rule 7.3
- [ ] Callbacks prefixed with `on`, handlers with `handle` → Rule 7.3
- [ ] Hooks prefixed with `use`, state pairs `[x, setX]` → Rule 7.4
- [ ] Props that initialize state prefixed with `initial` → Rule 10.1

## Component Structure [CRITICAL]

- [ ] Separate `interface.ts` + `index.tsx` → Rule 9.1
- [ ] HOC uses `with` prefix + separate file → Rule 9.2
- [ ] forwardRef has displayName → Rule 9.3
- [ ] No component definitions nested inside other components

## Anti-Patterns [CRITICAL]

- [ ] No `console.log` / `console.debug` / `console.info` → Custom-2
- [ ] Async operations have try-catch + user notification → Custom-3
- [ ] No magic numbers/strings → Custom-4
- [ ] useEffect has cleanup function → Custom-5
- [ ] No unused imports/variables → Custom-6.1
- [ ] No nested ternary → Custom-6.2
- [ ] No direct DOM manipulation → Custom-6.3
- [ ] No index as key → Custom-6.4

## Code Quality [WARNING]

- [ ] Functions have single responsibility → Rule 5.1
- [ ] No functions with more than 3 separate params → Rule 5.2
- [ ] Uses const by default, no var → Rule 6.1
- [ ] No large commented-out code blocks
- [ ] No duplicated logic that should be extracted

## File Organization [WARNING]

- [ ] Files placed correctly per project structure → Rule 11.1
- [ ] Shared components in `src/components/`
- [ ] Feature components in `src/features/{feature}/components/`

## Security [CRITICAL]

- [ ] No hardcoded secrets, API keys, or tokens
- [ ] No sensitive data in console output
- [ ] User input has validation/sanitization
- [ ] No `dangerouslySetInnerHTML` without sanitization

## Performance [INFO]

- [ ] No unnecessary re-renders
- [ ] No redundant data fetching in useEffect with frequently changing deps
- [ ] No expensive computations in the render path without memoization

## Testing (if test files are in the PR)

- [ ] Tests named with "should...when..." pattern
- [ ] Each test is independent
- [ ] External dependencies are mocked
- [ ] Uses stable selectors (`data-testid`, `role`) not CSS classes
- [ ] Test data is fixed, not random

## Requirements Compliance (if requirements exist in PR description)

- [ ] All requirements implemented
- [ ] All acceptance criteria met
- [ ] Edge cases handled as specified
