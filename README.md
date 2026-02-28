# Nischal Kelwadkar - Portfolio Site

A clean, custom HTML/CSS/JS portfolio site with zero dependencies and 100% control.

## 🚀 Quick Start

1. **Local Development:**
   ```bash
   # Serve locally (any method works):
   python3 -m http.server 8000
   # OR
   npx serve
   # Then visit http://localhost:8000
   ```

2. **Adding a New Project:**
   - Edit `projects.json` to add your project details
   - Create a new HTML file in `projects/` folder (copy existing template)
   - Commit and push to update live site

## 📁 Structure

```
custom-portfolio/
├── index.html              # Homepage
├── projects.json           # Project data (edit this!)
├── css/
│   ├── style.css          # Main styles
│   └── project.css        # Project page styles
├── js/
│   └── main.js            # Dynamic project loading
├── projects/
│   ├── ai-content-systems.html
│   ├── lacerte-forms-help.html
│   └── [your-new-project].html
└── images/                 # Project images (future)
```

## ✏️ How to Add a New Project

### Step 1: Update `projects.json`

Add a new entry to the `projects` array:

```json
{
  "id": "your-project-slug",
  "title": "Your Project Title",
  "tagline": "Short one-liner description",
  "client": "Client Name",
  "deliverables": ["Item 1", "Item 2"],
  "summary": "A brief summary for the card.",
  "featured": true,
  "tags": ["Tag1", "Tag2", "Tag3"],
  "year": "2024"
}
```

### Step 2: Create Project Page

Copy an existing project HTML file:

```bash
cp projects/ai-content-systems.html projects/your-project-slug.html
```

Then edit the content in your new HTML file.

### Step 3: Commit & Push

```bash
git add .
git commit -m "Add new project: Your Project Title"
git push
```

That's it! Your new project will appear on the live site.

## 🌐 Deployment to GitHub Pages

### Initial Setup

1. **Create GitHub repo:**
   ```bash
   # On GitHub, create a new repo: nischal-portfolio
   git remote add origin https://github.com/YOUR-USERNAME/nischal-portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: Deploy from branch → `main` → `/` (root)
   - Click Save

3. **Custom Domain (optional):**
   - Add a `CNAME` file with your domain:
     ```bash
     echo "www.nischalkelwadkar.com" > CNAME
     git add CNAME
     git commit -m "Add custom domain"
     git push
     ```
   - Update your domain's DNS:
     - Add CNAME record: `www` → `YOUR-USERNAME.github.io`
     - Add A records for apex domain (if using):
       ```
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
       ```

4. **Wait 5-10 minutes** for deployment

Your site will be live at: `https://YOUR-USERNAME.github.io/nischal-portfolio/`
(or your custom domain)

## 🛠️ Future Automation Ideas

### Python Script for New Projects

Create `add_project.py`:

```python
#!/usr/bin/env python3
import json
import shutil

# Prompt for project details
project_data = {
    "id": input("Project slug: "),
    "title": input("Project title: "),
    "tagline": input("Tagline: "),
    # ... etc
}

# Add to projects.json
with open('projects.json', 'r+') as f:
    data = json.load(f)
    data['projects'].append(project_data)
    f.seek(0)
    json.dump(data, f, indent=2)

# Create HTML page from template
shutil.copy('projects/_template.html', f'projects/{project_data["id"]}.html')

print(f"✅ Project added! Edit projects/{project_data['id']}.html")
```

### GitHub Actions for Auto-Deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 📊 Analytics (Optional)

Add Google Analytics to `index.html` (before `</head>`):

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🎨 Customization

- **Colors:** Edit CSS variables in `css/style.css` `:root` section
- **Fonts:** Change Google Fonts link in HTML `<head>`
- **Layout:** Modify grid layouts in CSS
- **Animations:** Adjust transitions in `js/main.js`

## 🐛 Troubleshooting

**Projects not loading?**
- Check browser console for errors
- Ensure `projects.json` is valid JSON
- Verify project HTML files exist in `projects/` folder

**Custom domain not working?**
- Check DNS propagation (can take 24-48 hours)
- Ensure CNAME file is in root directory
- Verify GitHub Pages custom domain setting

## 📝 License

© 2025 Nischal Kelwadkar. All rights reserved.
