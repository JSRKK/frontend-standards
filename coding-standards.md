# Frontend Coding Standards

> Version: 3.0
> Format: AI-Reviewable Rules with Severity Levels

**Severity Levels:**

- `[CRITICAL]` — Must fix before merge
- `[WARNING]` — Should fix, does not block merge
- `[INFO]` — Suggestion only, not required

---

## Quick Reference: Naming Rules

| Element | Convention | Prefix/Suffix | Example |
| --- | --- | --- | --- |
| Variable | camelCase | — | `userName` |
| Boolean var | camelCase | `is/has/should` | `isActive` |
| Constant | UPPER_SNAKE_CASE | — | `API_URL` |
| Function | camelCase | — | `getUserName` |
| Boolean fn | camelCase | `is/has/should` | `isValid()` |
| Component | PascalCase | — | `UserProfile` |
| Props type | PascalCase | `...Props` | `UserProfileProps` |
| Callback prop | camelCase | `on...` | `onSubmit` |
| Handler fn | camelCase | `handle...` | `handleSubmit` |
| Custom hook | camelCase | `use...` | `useUserData` |
| State pair | camelCase | `[x, setX]` | `[count, setCount]` |
| HOC | camelCase | `with...` | `withAuth` |
| HOC props | PascalCase | `With...Props` | `WithAuthProps` |
| Init prop | camelCase | `initial...` | `initialValues` |

---

## Section 1: Type Inference

> Applies to: `*.ts`, `*.tsx`

### Rule 1.1: Use type inference when initial value is clear [WARNING]

- **DO:** Let TypeScript infer types from initial values
- **DON'T:** Annotate types redundantly when the value already indicates the type

```ts
// ✅
const name = "John";
const age = 30;

// ❌
const name: string = "John";
const age: number = 30;
```

### Rule 1.2: Annotate types when no initial value is provided [CRITICAL]

- **DO:** Explicitly annotate types for uninitialized variables
- **DON'T:** Leave variables without both type and initial value

```ts
// ✅
let endDate: Date;
let items: string[];

// ❌
let endDate;
let items;
```

---

## Section 2: Return Types

> Applies to: `*.ts`, `*.tsx` (excluding test files)

### Rule 2.1: Always specify function return types [CRITICAL]

- **DO:** Annotate return types on all named functions and assigned arrow functions
- **DON'T:** Rely on TypeScript to infer return types
- **Exceptions:** Inline arrow functions in JSX with a single expression

```ts
// ✅
function getUserName(userId: string): string { ... }
const getAge = (id: string): number => { ... };

// ❌
function getUserName(userId: string) { ... }
```

---

## Section 3: Type Definition

> Applies to: `*.ts`, `*.tsx`

### Rule 3.1: interface vs type [INFO]

- **DO:** Use `interface` for object shapes, component props, API responses
- **DO:** Use `type` for unions, intersections, tuples, mapped types
- Both are acceptable — choose based on use case

```ts
// ✅ interface for objects
interface User { name: string; age: number; }

// ✅ type for union/tuple
type Direction = "left" | "right" | "top" | "bottom";
type Nullable<T> = T | null;
```

---

## Section 4: Array Types

> Applies to: `*.ts`, `*.tsx`

### Rule 4.1: Use T[] syntax as standard [WARNING]

- **DO:** Use `T[]`
- **DON'T:** Use `Array<T>`

```ts
// ✅
const numbers: number[] = [1, 2, 3];
const items: readonly string[] = ["a", "b"];

// ❌
const numbers: Array<number> = [1, 2, 3];
```

### Rule 4.2: Use readonly for arrays that should not be mutated [INFO]

- **DO:** Use `readonly T[]` when the array should not be mutated

---

## Section 5: Functions

> Applies to: `*.ts`, `*.tsx` (excluding test files)

### Rule 5.1: Single Responsibility [WARNING]

- **DO:** Each function should do one thing
- **DON'T:** Functions that do multiple things (fetch + transform + save)

```ts
// ✅
function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

// ❌
function processUser(user: User): string {
  const fullName = `${user.firstName} ${user.lastName}`;
  saveToDatabase(user);
  sendEmail(user);
  return fullName;
}
```

### Rule 5.2: Group related parameters into an object [WARNING]

- **DO:** Use object parameters when there are more than 3 params

```ts
// ✅
function createUser(params: CreateUserParams): User { ... }

// ❌
function createUser(name: string, age: number, email: string, role: string): User { ... }
```

### Rule 5.3: Use default parameters [INFO]

```ts
// ✅
function greet(user: User, greeting = "Hello"): string { ... }

// ❌
function greet(user: User, greeting?: string): string {
  const g = greeting || "Hello";
}
```

---

## Section 6: Variables

> Applies to: `*.ts`, `*.tsx`

### Rule 6.1: Use const by default [CRITICAL]

- **DO:** Use `const` always; use `let` only when reassignment is needed
- **DON'T:** Use `var`; don't use `let` without reassignment

### Rule 6.2: Constants must use UPPER_SNAKE_CASE [CRITICAL]

- **DO:** Use `as const` for constant arrays/objects

```ts
// ✅
const API_URL = "https://api.example.com";
const ROLES = ["admin", "user"] as const;

// ❌
const apiUrl = "https://api.example.com";
```

### Rule 6.3: Booleans must have a prefix [CRITICAL]

- **DO:** Prefix with `is`, `has`, or `should`

```ts
// ✅
const isActive = true;
const hasPermission = false;

// ❌
const active = true;
const permission = false;
```

### Rule 6.4: null vs undefined [WARNING]

- **DO:** `null` = intentionally empty value
- **DO:** `undefined` = intentionally omitted value

---

## Section 7: Naming Conventions

> Applies to: `*.ts`, `*.tsx`

### Rule 7.1: Variables & functions use camelCase [CRITICAL]

```ts
// ✅ userName, getUserName()
// ❌ UserName, user_name, GetUserName()
```

### Rule 7.2: Boolean functions start with is/has/should [WARNING]

```ts
// ✅ isValid(), hasPermission()
// ❌ checkValid(), validate()
```

### Rule 7.3: React component naming [CRITICAL]

- Component: `PascalCase`
- Props type: `{ComponentName}Props`
- Callback props: `on` prefix
- Handler functions: `handle` prefix

```ts
// ✅
interface UserProfileProps {
  onSubmit: () => void;
}
function UserProfile({ onSubmit }: UserProfileProps) {
  const handleSubmit = (): void => { onSubmit(); };
}
```

### Rule 7.4: Custom hooks [CRITICAL]

- `use` prefix, state pair `[x, setX]`, return object

```ts
// ✅
const [count, setCount] = useState(0);
const { data, isLoading } = useUserData();

// ❌
const [count, updateCount] = useState(0);
```

### Rule 7.5: Acceptable abbreviations [INFO]

- **Allowed:** `e`, `err`, `ctx`, `ref`, `props`, `params`, `config`, `auth`, `admin`, `btn`, `msg`, `req`/`res`, `prev`/`next`, `src`, `img`, `util`/`utils`
- **DON'T:** `usr`, `pwd`, `mgr`, `hdr`

---

## Section 8: Component Conventions

> Applies to: `*.tsx` component files

### Rule 8.1: Component naming structure [WARNING]

- **DO:** `[Feature][Page]ComponentName[Type]`
- **DON'T:** Vague names like `Card1`, `MyComponent`, `Comp`
- **DON'T:** Suffix with `Component`

### Rule 8.2: Shorten overly long names [INFO]

- Merge levels: `CarFormCarDetailsEquipment` → `CarFormEquipment`
- Remove redundancy: `ProductListingComponent` → `ProductListing`
- Drop feature prefix if shared: `EcommerceProductCard` → `ProductCard`

---

## Section 9: Component Types & Structure

> Applies to: `*.tsx` component files

### Rule 9.1: Functional components use index.tsx + interface.ts [CRITICAL]

```
ComponentName/
├─ index.tsx      # component
└─ interface.ts   # props type
```

### Rule 9.2: HOC uses with prefix + separate file [WARNING]

```
ComponentName/
├─ index.ts
├─ interface.ts
├─ ComponentName.tsx
└─ withComponentName.tsx
```

### Rule 9.3: forwardRef must have displayName [CRITICAL]

```ts
// ✅
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children }, ref) => <button ref={ref}>{children}</button>
);
Button.displayName = "Button";
```

---

## Section 10: Props to State

> Applies to: `*.tsx` using `useState` with prop values

### Rule 10.1: Props that initialize state must use initial prefix [CRITICAL]

```ts
// ✅
interface FormProps { initialValues: Record<string, string>; }
function Form({ initialValues }: FormProps) {
  const [values, setValues] = useState(initialValues);
}

// ❌
interface FormProps { values: Record<string, string>; }
```

---

## Section 11: Source Organization

> Applies to: file placement across the project

### Rule 11.1: File placement [WARNING]

- Shared components → `src/components/`
- Feature components → `src/features/{feature}/components/`
- Pages → `src/features/{feature}/pages/`
- Routes → `src/features/{feature}/{feature}Routes.tsx`
- Shared hooks → `src/hooks/`
- Models → `src/models/{domain}/`
- Constants/Enums → `src/enums/`
- Utilities → `src/lib/`
- **DON'T:** Place feature-specific components in `src/components/`
- **DON'T:** Put business logic in component files
