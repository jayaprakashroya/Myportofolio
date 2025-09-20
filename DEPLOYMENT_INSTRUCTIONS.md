 # Deployment Instructions for Portfolio Project on Render

## Step 1: Initialize Git Repository
If you haven't already initialized a git repository in your project folder, run:
```
git init
git add .
git commit -m "Initial commit"
```

## Step 2: Push to GitHub
1. Create a new repository on GitHub.
2. Add the remote repository URL to your local git:
```
git remote add origin https://github.com/yourusername/your-repo.git
```
3. Push your code to GitHub:
```
git push -u origin main
```

## Step 3: Deploy on Render
1. Go to [Render](https://render.com) and sign in or create an account.
2. Click on **New** and select **Static Site**.
3. Connect your GitHub account and select your portfolio repository.
4. For **Build Command**, leave it empty.
5. For **Publish Directory**, enter the folder containing your `index.html` file (e.g., `/` or `vcard-personal-portfolio-master`).
6. Click **Create Static Site**.

Render will build and deploy your site and provide you with a live URL.

---

If you want, I can help you with creating the GitHub repository and pushing your code. Please let me know how you want to proceed.
