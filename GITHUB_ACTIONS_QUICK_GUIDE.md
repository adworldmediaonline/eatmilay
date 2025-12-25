# 🚀 GitHub Actions + Vercel + Biome Quick Guide

## 📋 What We've Set Up

### 1. **GitHub Actions Workflows**

- **Preview Deployments** (`.github/workflows/preview.yaml`)
  - Triggers: Push to any branch except `main` + Pull requests to `main`
  - Creates preview deployments for testing

- **Production Deployments** (`.github/workflows/production.yaml`)
  - Triggers: Push to `main` branch
  - Creates production deployments

### 2. **Biome Integration**

- **Code Quality**: Linting + Formatting before deployment
- **Speed**: 35x faster than Prettier
- **Rules**: 355 linting rules + automatic formatting

### 3. **Package Scripts**

```json
{
  "check": "biome check --write .", // Format + lint with fixes
  "check:ci": "biome check .", // Check only (no fixes)
  "format": "biome format --write .", // Format only
  "format:check": "biome format .", // Check formatting
  "lint:biome": "biome lint ." // Lint only
}
```

## 🔧 Setup Required (One-Time)

### Step 1: Get Vercel Credentials

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link your project (creates .vercel/project.json)
vercel link
```

### Step 2: Add GitHub Secrets

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

- `VERCEL_TOKEN` - Get from [Vercel Dashboard](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` - From `.vercel/project.json` → `orgId`
- `VERCEL_PROJECT_ID` - From `.vercel/project.json` → `projectId`

### Step 3: Set Environment Variables in Vercel

Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → **Settings** → **Environment Variables**

Add your environment variables for both **Preview** and **Production** environments:

- Database URLs
- API keys
- Any other environment variables your app needs

## 🧪 How to Test

### Test 1: Preview Deployment

```bash
# Create a new branch
git checkout -b test-preview-deployment

# Make a small change (e.g., update README)
echo "# Test Preview Deployment" >> TEST.md

# Commit and push
git add TEST.md
git commit -m "test: preview deployment"
git push origin test-preview-deployment
```

**Expected Result**:

- GitHub Action runs automatically
- Creates a preview deployment
- You'll see a comment on the branch with the preview URL

### Test 2: Production Deployment

```bash
# Merge your test branch to main
git checkout main
git merge test-preview-deployment
git push origin main
```

**Expected Result**:

- GitHub Action runs automatically
- Creates a production deployment
- Your app is live on your production domain

### Test 3: Biome Code Quality

```bash
# Test locally first
pnpm install
pnpm check

# If you have formatting issues, fix them:
pnpm format
```

**Expected Result**:

- Code gets formatted and linted
- Any issues are automatically fixed where possible
- Build fails if there are unfixable issues

## 📊 Monitoring Your Workflows

### GitHub Actions Tab

1. Go to your GitHub repo
2. Click **Actions** tab
3. See all workflow runs
4. Click on any run to see detailed logs

### What to Look For

- ✅ **Green checkmark**: Workflow succeeded
- ❌ **Red X**: Workflow failed (check logs)
- 🟡 **Yellow circle**: Workflow running

## 🚨 Common Issues & Solutions

### Issue 1: "Missing Vercel Token"

**Solution**: Make sure you added `VERCEL_TOKEN` in GitHub Secrets

### Issue 2: "Build Failed - Biome Issues"

**Solution**:

```bash
# Run locally to see issues
pnpm check

# Fix formatting issues
pnpm format

# Commit fixes
git add .
git commit -m "fix: biome formatting issues"
git push
```

### Issue 3: "Environment Variables Missing"

**Solution**: Add missing variables in Vercel Dashboard → Settings → Environment Variables

### Issue 4: "Prisma Generation Failed"

**Solution**: Make sure database connection strings are set in Vercel environment variables

## 🎯 Quick Commands Reference

```bash
# Local development
pnpm dev                    # Start development server
pnpm check                  # Format + lint code
pnpm build                  # Build for production

# Testing workflows
git checkout -b test-branch # Create test branch
# ... make changes ...
git push origin test-branch # Trigger preview deployment

# Production deployment
git checkout main
git merge test-branch
git push origin main        # Trigger production deployment
```

## 📈 What Happens When You Push

### Push to Feature Branch

1. **Biome checks** run (format + lint)
2. **Preview deployment** created
3. **Preview URL** posted as comment
4. You can test changes safely

### Push to Main Branch

1. **Biome checks** run (format + lint)
2. **Production deployment** created
3. **Live site** updated
4. **Domain** automatically updated

## 🔄 Workflow Summary

```
Code Push → GitHub Actions → Biome Checks → Vercel Build → Deploy → ✅ Live Site
     ↓              ↓              ↓              ↓           ↓
   Branch        Lint/Format    Build Artifacts  Upload    Preview/Prod
```

## 🎉 You're All Set!

Once you complete the setup steps above, every push will automatically:

- ✅ Check code quality with Biome
- ✅ Deploy to Vercel
- ✅ Give you preview URLs for testing
- ✅ Deploy to production on main branch

**Next Steps**: Complete the setup, then make a test push to see it in action! 🚀
