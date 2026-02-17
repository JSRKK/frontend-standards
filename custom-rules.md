# Custom Review Rules — Anti-Patterns

> Version: 2.0
> Scope: All frontend projects
> Purpose: Common anti-patterns — AI must flag every occurrence
> Severity levels: See coding-standards.md

---

## Custom-1: No `any` type [CRITICAL]

> Applies to: `*.ts`, `*.tsx`
> Detect: `: any`, `as any`, `<any>`

- **DON'T:** Use `any` in any case
- **DO:** Use `unknown` and narrow the type, or create a proper type/interface
- **Exceptions:** Third-party libraries without type definitions — must include an explanatory comment

```ts
// ❌
function processData(data: any): any {
  return data.items.map((item: any) => item.name);
}

// ✅
function processData(data: ApiResponse<UserList>): string[] {
  return data.data.items.map((item) => item.name);
}

// ✅ Acceptable exception (must have comment)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyLib: any = window.LegacySDK; // TODO: Create type definition
```

---

## Custom-2: No console.log in production [CRITICAL]

> Applies to: `*.ts`, `*.tsx` (excluding test files)
> Detect: `console.log`, `console.debug`, `console.info`

- **DON'T:** Leave `console.log`, `console.debug`, `console.info` in code
- **DON'T:** Leave commented-out console statements
- **DO:** Remove before merge
- **Allowed:** `console.error`, `console.warn` (for error tracking)

```ts
// ❌
console.log("data", data);
// console.log("debug:", value);

// ✅
console.error("Submit failed:", error);
```

---

## Custom-3: Error handling required [CRITICAL]

> Applies to: `*.ts`, `*.tsx` with async operations
> Detect: `await` without `try`, `.then()` without `.catch()`

- **DON'T:** Async operations without try-catch
- **DON'T:** Empty catch blocks
- **DON'T:** Catch and only log without notifying the user
- **DO:** try-catch → notify user (toast/alert) + log error + handle loading/error state

```ts
// ❌
const response = await api.getUsers();
setUsers(response.data);

// ❌ Empty catch
try { ... } catch (error) { }

// ❌ Log only
try { ... } catch (error) { console.log(error); }

// ✅
try {
  setIsLoading(true);
  const response = await api.getUsers();
  setUsers(response.data);
} catch (error) {
  console.error("Failed to fetch users:", error);
  toast.error("Unable to load data. Please try again.");
  setError(error);
} finally {
  setIsLoading(false);
}
```

---

## Custom-4: No hardcoded values (magic numbers/strings) [WARNING]

> Applies to: `*.ts`, `*.tsx`
> Detect: Literal numbers/strings in conditions, calculations, comparisons

- **DON'T:** Use raw numbers/strings inline
- **DO:** Extract to named constants (UPPER_SNAKE_CASE)
- **Exceptions:** `0`, `1`, `-1`, `""`, `true`, `false`, `null`

```ts
// ❌
if (user.role === "admin") { ... }
if (retryCount > 3) { ... }
const tax = price * 0.07;

// ✅
const ADMIN_ROLE = "admin";
const MAX_RETRIES = 3;
const TAX_RATE = 0.07;

if (user.role === ADMIN_ROLE) { ... }
if (retryCount > MAX_RETRIES) { ... }
const tax = price * TAX_RATE;
```

---

## Custom-5: useEffect must have cleanup [CRITICAL]

> Applies to: `*.tsx` with `useEffect`
> Detect: useEffect + setInterval/setTimeout/addEventListener/subscribe/async — without return cleanup

- **DON'T:** useEffect with side effects without cleanup

**Trigger conditions:**

| Found in useEffect | Required cleanup |
| --- | --- |
| `setInterval` | `clearInterval` |
| `setTimeout` | `clearTimeout` |
| `addEventListener` | `removeEventListener` |
| `.subscribe(` | `.unsubscribe()` or cleanup fn |
| `async` + `setState` | `AbortController` or cancel flag |

```ts
// ❌
useEffect(() => {
  const timer = setInterval(() => fetchData(), 5000);
}, []);

useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);

// ✅
useEffect(() => {
  const timer = setInterval(() => fetchData(), 5000);
  return () => clearInterval(timer);
}, []);

useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// ✅ Async with abort
useEffect(() => {
  const controller = new AbortController();
  async function loadData(): Promise<void> {
    try {
      const data = await fetchData({ signal: controller.signal });
      setData(data);
    } catch (error) {
      if (!controller.signal.aborted) console.error(error);
    }
  }
  loadData();
  return () => controller.abort();
}, []);
```

---

## Custom-6: Common code smells [WARNING]

> Applies to: `*.ts`, `*.tsx`

### 6.1: Unused imports/variables

- **DON'T:** Leave unused imports or variables in code

### 6.2: Nested ternary

- **DON'T:** Nest ternary operators more than 1 level
- **DO:** Use if-else or early return

```ts
// ❌
const label = isAdmin ? "Admin" : isMod ? "Moderator" : "User";

// ✅
function getUserLabel(user: User): string {
  if (user.isAdmin) return "Admin";
  if (user.isMod) return "Moderator";
  return "User";
}
```

### 6.3: Direct DOM manipulation in React

- **DON'T:** `document.getElementById`, `document.querySelector`
- **DO:** Use `useRef`

### 6.4: Index as key in dynamic lists

- **DON'T:** `key={index}` when the list can be reordered/filtered
- **DO:** Use a unique id from the data

```ts
// ❌
{items.map((item, index) => <Item key={index} {...item} />)}

// ✅
{items.map((item) => <Item key={item.id} {...item} />)}
```

### 6.5: Prop drilling beyond 3 levels

- **DON'T:** Pass props through more than 3 component levels
- **DO:** Use Context API or state management
