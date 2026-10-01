# Husky + lint-staged - Automated Code Quality Setup

## ✅ What Was Installed

1. **husky** (v9.1.7) - Modern Git hooks manager
2. **lint-staged** (v16.2.7) - Run linters on staged files only

## 📦 What Was Done

### 1. Package Installation

```bash
npm install --save-dev husky lint-staged
```

### 2. Husky Configuration

Created `.husky/` directory with:

- **`pre-commit`** - Hook that runs before each commit
- **`_/husky.sh`** - Husky helper script

### 3. lint-staged Configuration

Created `.lintstagedrc.js` with rules for:

- TypeScript/JavaScript files - ESLint + Prettier
- JSON files - Prettier
- Markdown files - Prettier
- YAML files - Prettier

### 4. NPM Scripts Added

New scripts in `package.json`:

- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check formatting without changing files
- `npm run type-check` - Run TypeScript compiler checks
- `prepare` - Automatically sets up Husky on `npm install`

### 5. Git Configuration

Configured Git to use Husky hooks directory

## 🎯 How It Works

### Pre-Commit Hook Flow

When you run `git commit`:

1. **Git triggers `.husky/pre-commit` hook**
2. **Hook runs `npx lint-staged`**
3. **lint-staged processes only staged files:**

   ```
   *.ts, *.tsx, *.js, *.jsx
   ├── Run ESLint with auto-fix
   └── Run Prettier to format code

   *.json
   └── Run Prettier to format

   *.md
   └── Run Prettier to format

   *.yml, *.yaml
   └── Run Prettier to format
   ```

4. **If all checks pass → Commit succeeds**
5. **If any check fails → Commit is aborted**

### What Gets Checked

✅ **TypeScript/JavaScript Files:**

- ESLint rules compliance
- Code style consistency (Prettier)
- Auto-fixable issues are fixed automatically

✅ **JSON Files:**

- Proper formatting
- Valid JSON syntax (via Prettier)

✅ **Markdown Files:**

- Consistent formatting
- Proper line breaks and spacing

✅ **YAML Files:**

- Consistent formatting
- Proper indentation

## 🚀 Usage Examples

### Normal Workflow (Everything Passes)

```bash
# 1. Make changes to files
echo "const x=1" > test.ts

# 2. Stage files
git add test.ts

# 3. Commit (hook runs automatically)
git commit -m "Add test file"

# Output:
# ✔ Preparing lint-staged...
# ✔ Running tasks for staged files...
# ✔ Applying modifications from tasks...
# ✔ Cleaning up temporary files...
# [main abc1234] Add test file
#  1 file changed, 1 insertion(+)
```

### When Linting Fails

```bash
# 1. Create file with linting error
echo "const x = 1; console.log(x" > broken.ts

# 2. Stage and try to commit
git add broken.ts
git commit -m "Add broken file"

# Output:
# ✖ ESLint found errors:
#   broken.ts
#     1:1  error  Unexpected console statement  no-console
#     1:30 error  Missing closing parenthesis
#
# ✖ lint-staged failed
# husky - pre-commit hook exited with code 1 (error)
```

The commit is **blocked** until you fix the errors!

### Auto-Fix Example

```bash
# 1. Create file with auto-fixable issues
echo "const x=1;const y=2;" > fixable.ts

# 2. Stage and commit
git add fixable.ts
git commit -m "Add file"

# Husky runs lint-staged:
# ✔ ESLint auto-fixes spacing issues
# ✔ Prettier formats the file
# ✔ Commit succeeds with fixed code!

# The file is now formatted as:
# const x = 1;
# const y = 2;
```

## 📋 Available Commands

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check if files are formatted (doesn't change files)
npm run format:check
```

### Type Checking

```bash
# Run TypeScript compiler without emitting files
npm run type-check
```

### Running lint-staged Manually

```bash
# Run lint-staged on all staged files
npx lint-staged

# Run on specific files
git add specific-file.ts
npx lint-staged
```

## 🔧 Customization

### Adding More Checks

Edit `.lintstagedrc.js`:

```javascript
module.exports = {
  // Existing rules...

  // Add type checking for TypeScript files
  '*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    () => 'tsc --noEmit', // Type check
  ],

  // Add tests for changed files
  '*.test.{ts,tsx}': ['jest --findRelatedTests --passWithNoTests'],

  // Custom script for specific files
  'src/**/*.tsx': ['echo "Checking React component..."', 'eslint --fix'],
};
```

### Skipping Hooks (Emergency Only!)

```bash
# Skip pre-commit hook (NOT RECOMMENDED)
git commit -m "Emergency fix" --no-verify

# Or set environment variable
HUSKY=0 git commit -m "Skip all hooks"
```

⚠️ **Use sparingly!** Skipping hooks defeats the purpose of automated quality checks.

### Adding More Hooks

Create new hooks in `.husky/`:

#### Pre-Push Hook

```bash
# .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run tests before pushing
npm test

# Run type checking
npm run type-check
```

Make it executable:

```bash
chmod +x .husky/pre-push
```

#### Commit Message Hook

```bash
# .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Validate commit message format
npx --no -- commitlint --edit $1
```

## 🛠️ Troubleshooting

### Hook Not Running

**Problem:** Git commit succeeds without running lint-staged

**Solution:**

```bash
# Check if hooks are enabled
git config core.hooksPath

# Should output: .husky

# If not, run:
git config core.hooksPath .husky

# Make sure hook is executable
chmod +x .husky/pre-commit
```

### ESLint/Prettier Conflicts

**Problem:** ESLint and Prettier fight over formatting

**Solution:** Already configured! `.prettierrc.js` is set up to work with ESLint.

### Slow Pre-Commit

**Problem:** Hook takes too long on large commits

**Solution:** lint-staged only processes **staged files**, but you can optimize:

```javascript
// .lintstagedrc.js
module.exports = {
  // Run in parallel and limit concurrency
  '*.{ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  // Separate JSON processing
  '*.json': 'prettier --write',
};
```

### Node Version Issues

**Problem:** Husky requires Node >= 18

**Solution:** The project requires Node >= 20 (see `package.json` engines). If you're on an older version:

```bash
# Check your Node version
node --version

# Update using nvm (recommended)
nvm install 20
nvm use 20

# Or update using your package manager
```

### Husky Not Installing

**Problem:** `npm install` doesn't set up hooks

**Solution:**

```bash
# Manually run prepare script
npm run prepare

# Or run husky install directly
npx husky install
```

## 📚 Configuration Files

### `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### `.lintstagedrc.js`

```javascript
module.exports = {
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.json': ['prettier --write'],
  '*.md': ['prettier --write'],
  '*.{yml,yaml}': ['prettier --write'],
};
```

### `package.json` scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky || true"
  }
}
```

## 🎯 Best Practices

### 1. Keep Hooks Fast

- Only run checks on staged files (lint-staged handles this)
- Avoid running full test suite in pre-commit (use pre-push instead)
- Use parallel processing when possible

### 2. Fix Issues, Don't Skip

- If pre-commit fails, fix the issue
- Use `npm run lint:fix` to auto-fix when possible
- Only use `--no-verify` in true emergencies

### 3. Team Communication

- Inform team members about new hooks
- Document any custom rules in this file
- Keep hook scripts simple and maintainable

### 4. Progressive Enhancement

- Start with basic linting
- Add more checks gradually
- Get team buy-in before adding strict rules

## 🔍 What Gets Checked vs What Doesn't

### ✅ Checked Automatically

- **Staged files** modified in this commit
- ESLint rules
- Prettier formatting
- File extensions: `.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.md`, `.yml`, `.yaml`

### ❌ NOT Checked (by default)

- Unstaged files
- Files not modified in this commit
- Test files (unless explicitly added)
- Type errors (unless you add `type-check` to lint-staged)
- Build errors

### 💡 Tip

Add a pre-push hook for comprehensive checks (tests, type-checking, build):

```bash
# .husky/pre-push
npm run type-check && npm test
```

## 📖 Learning Resources

### Husky

- [Official Documentation](https://typicode.github.io/husky/)
- [Git Hooks Explained](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

### lint-staged

- [Official Repository](https://github.com/lint-staged/lint-staged)
- [Configuration Options](https://github.com/lint-staged/lint-staged#configuration)

## 🚀 Next Steps

1. **Make your first commit** to see hooks in action
2. **Add pre-push hook** for comprehensive testing (optional)
3. **Customize lint-staged rules** for your specific needs
4. **Share with team** and document any custom configurations

---

**Ready to use!** 🎉 Every commit is now automatically checked for code quality. No more "fix linting" commits!
