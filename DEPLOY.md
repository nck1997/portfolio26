# 🚀 Deployment Guide - Nischal Kelwadkar Portfolio

## Quick Deploy to GitHub Pages

### 1. Create GitHub Repository

```bash
# Navigate to your portfolio directory
cd /Users/Nischal/clawd/custom-portfolio

# Configure Git (if not already done)
git config --global user.name "Nischal Kelwadkar"
git config --global user.email "nischalnck@gmail.com"

# Verify initial commit
git log --oneline
```

### 2. Push to GitHub

**On GitHub:**
1. Go to https://github.com/new
2. Repository name: `portfolio` (or `nischalkelwadkar.com`)
3. Description: "Personal portfolio site"
4. Public
5. **DO NOT** initialize with README (we already have files)
6. Click "Create repository"

**In Terminal:**
```bash
# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source":
   - Select branch: `main`
   - Select folder: `/` (root)
4. Click **Save**
5. Wait 2-5 minutes

Your site will be live at:
`https://YOUR-USERNAME.github.io/portfolio/`

---

## 🌐 Custom Domain Setup (nischalkelwadkar.com)

### Step 1: Add CNAME File

```bash
cd /Users/Nischal/clawd/custom-portfolio

# Create CNAME file
echo "www.nischalkelwadkar.com" > CNAME

# Commit and push
git add CNAME
git commit -m "Add custom domain"
git push
```

### Step 2: Configure GitHub Pages

1. Go to repo **Settings** → **Pages**
2. Under "Custom domain":
   - Enter: `www.nischalkelwadkar.com`
   - Click **Save**
3. Check "Enforce HTTPS" (after DNS propagates)

### Step 3: Update DNS Records

**If using Squarespace Domain (current):**

1. Log into Squarespace
2. Go to **Settings** → **Domains**
3. Click on `nischalkelwadkar.com`
4. Go to **DNS Settings**
5. Add these records:

**CNAME Record:**
```
Host: www
Data: YOUR-USERNAME.github.io
TTL: 3600
```

**A Records (for apex domain):**
```
Host: @
Data: 185.199.108.153
TTL: 3600

Host: @
Data: 185.199.109.153
TTL: 3600

Host: @
Data: 185.199.110.153
TTL: 3600

Host: @
Data: 185.199.111.153
TTL: 3600
```

**OR if using another DNS provider (Cloudflare, GoDaddy, etc.):**
- Same records as above
- Access your DNS dashboard
- Add CNAME and A records

### Step 4: Wait for Propagation

- **DNS propagation:** 10 minutes - 48 hours (usually ~1 hour)
- Check status: `dig www.nischalkelwadkar.com`

---

## 🔄 Future Updates Workflow

Every time you add a project or make changes:

```bash
# Make your edits (update projects.json, create HTML files, etc.)

# Commit changes
git add .
git commit -m "Add new project: Project Name"

# Push to GitHub (auto-deploys!)
git push

# Wait 1-2 minutes for GitHub Pages to rebuild
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Homepage loads at your domain
- [ ] Navigation links work
- [ ] Projects load dynamically from JSON
- [ ] Project detail pages load
- [ ] Mobile responsive (test on phone)
- [ ] HTTPS enabled (green padlock)
- [ ] LinkedIn/email links work
- [ ] Smooth scrolling works

---

## 🛠️ Automation Script (Optional Future Enhancement)

Create `deploy.sh`:

```bash
#!/bin/bash

# Quick deploy script
echo "📦 Committing changes..."
git add .
git commit -m "${1:-Update portfolio}"

echo "🚀 Pushing to GitHub..."
git push

echo "✅ Deployed! Site will update in ~1 minute"
echo "🌐 https://www.nischalkelwadkar.com"
```

Make it executable and use:
```bash
chmod +x deploy.sh
./deploy.sh "Add new project"
```

---

## 🎯 Next Steps

1. **Deploy to GitHub Pages** (follow steps above)
2. **Test the live site**
3. **Configure custom domain**
4. **Add Google Analytics** (optional)
5. **Share the link!**

---

## 📞 Troubleshooting

**Site not updating after push?**
- Check GitHub Actions tab in repo
- GitHub Pages can take 1-10 minutes to rebuild
- Hard refresh browser (Cmd+Shift+R)

**Custom domain shows 404?**
- Verify CNAME file is in repo root
- Check DNS records are correct
- Wait longer (DNS propagation)
- Ensure "Enforce HTTPS" is unchecked initially

**Projects not loading?**
- Open browser console (F12)
- Check for JavaScript errors
- Verify projects.json is valid JSON
- Check file paths are correct

---

## 🎉 You're Done!

Your portfolio is now:
- ✅ Live on the web
- ✅ 100% under your control
- ✅ Easy to update (just edit files + push)
- ✅ Free hosting forever (GitHub Pages)
- ✅ Custom domain ready

Want to add a new project? Just:
1. Edit `projects.json`
2. Create HTML page in `projects/`
3. `git push`

That's it! 🚀
