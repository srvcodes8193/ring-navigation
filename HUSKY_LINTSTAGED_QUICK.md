# Husky + lint-staged - Quick Reference

## 🎯 What It Does

Automatically runs **ESLint** and **Prettier** on staged files before every commit. If code has issues, the commit is **blocked** until you fix them.

## ⚡ Quick Commands

```bash
# Auto-fix linting issues
npm run lint:fix

# Format all files
npm run format

# Check formatting (no changes)
npm run format:check

# Type check
npm run type-check

# Run lint-staged manually
npx lint-staged

# Skip hook (emergency only!)
git commit --no-verify
```

## 🔄 Normal Workflow

```bash
# 1. Make changes
# 2. Stage files
git add .

# 3. Commit (hook runs automatically)
git commit -m "Your message"

# ✅ If checks pass → Commit succeeds
# ❌ If checks fail → Fix issues and try again
```

## 📝 What Gets Checked

| File Type                        | Checks Applied    |
| -------------------------------- | ----------------- |
| `*.ts`, `*.tsx`, `*.js`, `*.jsx` | ESLint + Prettier |
| `*.json`                         | Prettier          |
| `*.md`                           | Prettier          |
| `*.yml`, `*.yaml`                | Prettier          |

## 🛠️ Common Scenarios

### Linting Errors

```bash
# Option 1: Auto-fix
npm run lint:fix
git add .
git commit -m "Fix linting"

# Option 2: Manual fix
# Fix the errors in your editor
git add .
git commit -m "Fix linting"
```

### Formatting Issues

```bash
# Format all files
npm run format
git add .
git commit -m "Format code"
```

### Emergency Commit (Skip Hooks)

```bash
# ⚠️ Use only when absolutely necessary!
git commit -m "Emergency fix" --no-verify
```

## 🔧 Files

- **`.husky/pre-commit`** - Pre-commit hook script
- **`.lintstagedrc.js`** - lint-staged configuration
- **`package.json`** - NPM scripts

## 💡 Tips

1. **Fix issues** instead of skipping hooks
2. Use `npm run lint:fix` for auto-fixes
3. Format on save in VSCode (already configured)
4. Run `npm run type-check` before big commits

## 🚨 Troubleshooting

### Hook not running?

```bash
git config core.hooksPath .husky
chmod +x .husky/pre-commit
```

### Too slow?

lint-staged only processes **staged files**, so it should be fast. If not, check `.lintstagedrc.js`.

### ESLint/Prettier conflict?

Already configured to work together. If issues persist, check `.eslintrc.js` and `.prettierrc.js`.

---

Full documentation: [HUSKY_LINTSTAGED_SETUP.md](HUSKY_LINTSTAGED_SETUP.md)
