# Expense Tracker App 💰

A React Native mobile app powered by Supabase that helps users monitor spending with secure magic-link authentication. Developed as a school project to master real-world mobile development, this app includes:
- 🔐 **Passwordless Login**: Secure magic-links via Supabase Auth  
- 💸 **Transaction Tracking**: Log and view last 10 expenses  
- 📈 **Data Visualization**: Monthly/yearly spending charts  
- ⚙️ **Profile Management**: Update names or delete accounts  

## 🛠 Tech Stacks

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white) ![React Native](https://img.shields.io/badge/React%20Native-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black) ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E.svg?style=for-the-badge&logo=Supabase&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=for-the-badge&logo=GitHub-Actions&logoColor=white)

### Key Libraries
- **Auth**: Supabase Magic Links
- **Database**: Supabase PostgreSQL
- **Charts**: React Native Chart Kit
- **State Management**: React Context

## DevOps with GitHub Actions

The project uses a GitHub Actions workflow to automatically check and fix code formatting using Biome when a pull request is made.

### Format Workflow
The Format Workflow runs automatically when a pull request is created for the main branch, and it changes `.tsx` and `.ts` files. It makes sure the code stays clean and properly formatted.

Steps it does:
- Checks out the pull request code.
- Sets up Node.js version 20.
- Installs project dependencies (using npm ci).
- Runs the format script (using npm run format).
- If any formatting changes happen, it automatically commits and pushes the changes back to the pull request.

[Format Workflow](./.github/workflows/format.yml)

## 📸 Screenshots

<details close>
<summary>Click to see Landing Page</summary>

### Before
<img src="./media/before/landing-1.png" alt="Initial landing page design showing basic layout" width="200">
<img src="./media/before/signup-1.png" alt="Initial signup page design with input fields and form layout" width="200">


### After
<img src="./media/after/landing.png" alt="Final landing page design with improved layout and visuals" width="200">


</details>

<details close>
<summary>Click to see Dashboard Page</summary>

### Before
<img src="./media/before/dashboard-1.png" alt="Old dashboard showing a list of transactions" width="200">
<img src="./media/before/dashboard_pop_up-1.png" alt="Old dashboard with an 'add transaction' modal popup" width="200">


### After
<img src="./media/after/dashboard.png" alt="Updated dashboard layout showing transaction summary" width="200">
<img src="./media/after/dashbaord-add-item.png" alt="New dashboard design with 'add transaction' modal open" width="200">
<img src="./media/after/dashboard-show-item.png" alt="New dashboard showing a transaction item in detail" width="200">
<img src="./media/after/dashboard-edit-item.png" alt="New dashboard with 'edit transaction' modal open" width="200">


</details>

<details close>
<summary>Click to see Visualization Page</summary>

### Before
<img src="./media/before/charts-1.png" alt="Old visualization page with simple chart layout" width="200">

### After
<img src="./media/after/visualization-monthly.png" alt="New monthly spending visualization with bar chart" width="200">
<img src="./media/after/visualization-yearly.png" alt="New yearly spending visualization with line chart" width="200">

</details>

<details close>
<summary>Click to see Settings Page</summary>

### Before
<img src="./media/before/settings-1.png" alt="Old settings page with basic input form included danger zone for account deletion" width="200">

### After
<img src="./media/after/settings-complete-profile.png" alt="Updated settings page prompting user to complete profile" width="200">
<img src="./media/after/settings-input.png" alt="Settings page showing user input form fields" width="200">
<img src="./media/after/settings-completed-profile.png" alt="Updated settings page with completed profile information" width="200">

</details>

## 🎥 Demo

Check out the video demo on YouTube:  
👉 [https://www.youtube.com/shorts/IUMmoQ-PHQc](https://www.youtube.com/shorts/IUMmoQ-PHQc)

