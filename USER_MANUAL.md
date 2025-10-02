# Influencer Management Platform - User Manual

Complete guide for using the Influencer Management Platform.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard](#dashboard)
3. [Managing Influencers](#managing-influencers)
4. [Advanced Filtering](#advanced-filtering)
5. [Creating Campaigns](#creating-campaigns)
6. [Exporting PDFs](#exporting-pdfs)
7. [Bulk Operations](#bulk-operations)
8. [Import/Export Data](#importexport-data)
9. [Analytics](#analytics)
10. [Tips & Best Practices](#tips--best-practices)

## Getting Started

### Accessing the Platform

1. Open your web browser
2. Navigate to the platform URL
3. You'll see the homepage with three main sections:
   - **Influencers:** Manage your influencer database
   - **Campaigns:** Build and export campaigns
   - **Analytics:** View insights and statistics

### Navigation

The top navigation bar provides quick access to all sections:
- **Dashboard:** Homepage with overview
- **Influencers:** Influencer management
- **Campaigns:** Campaign builder
- **Analytics:** Analytics dashboard

## Dashboard

The dashboard provides an overview of the platform features:

- **Influencers Card:** Quick access to influencer management
- **Campaigns Card:** Quick access to campaign builder
- **Analytics Card:** Quick access to analytics dashboard
- **Platform Features:** List of all available features

## Managing Influencers

### Adding a New Influencer

1. Click **Influencers** in the navigation bar
2. Click the **Add Influencer** button (top right)
3. Fill in the required fields:

   **Required Fields:**
   - **Name:** Full name of the influencer
   - **Username/Handle:** Social media username (e.g., @username)
   - **Platforms:** Select at least one platform (Instagram, TikTok, YouTube, etc.)
   - **Category:** Choose from 12 pre-loaded categories or add a new one
   - **Gender:** Select Male or Female
   - **Advertising Rate:** Enter the rate in SAR (Saudi Riyals)
   - **Followers Count:** Total followers across selected platforms
   - **Region:** Choose from 20 Saudi regions or add a new one

   **Optional Fields:**
   - **Phone Number:** Contact number
   - **Notes:** Additional information

4. Click **Save** to add the influencer

### Editing an Influencer

1. Find the influencer in the table
2. Click the **Edit** button (pencil icon)
3. Modify the fields as needed
4. Click **Save** to update

### Deleting an Influencer

1. Find the influencer in the table
2. Click the **Delete** button (trash icon)
3. Confirm the deletion

### Adding New Categories or Regions

While adding/editing an influencer:
1. Click the **Add New** button next to Category or Region
2. Enter the new name
3. Click **Add**
4. The new option will appear in the dropdown

## Advanced Filtering

### Using the Search Bar

1. Type in the search bar at the top of the Influencers page
2. Search by name or username
3. Results update automatically

### Using Advanced Filters

1. Click the **Filters** button
2. A side panel will open with filter options:

   **Available Filters:**
   - **Category:** Select one or more categories
   - **Region:** Select one or more regions
   - **Gender:** Select Male, Female, or both
   - **Platforms:** Check the platforms you want to include
   - **Advertising Rate Range:**
     - Min Rate: Minimum rate in SAR
     - Max Rate: Maximum rate in SAR
   - **Followers Count Range:**
     - Min Followers: Minimum follower count
     - Max Followers: Maximum follower count

3. Click **Apply Filters** to see results
4. The active filter count will be displayed on the Filters button

### Resetting Filters

1. Open the Filters panel
2. Click **Reset** at the bottom
3. All filters will be cleared

### Combining Filters

You can combine multiple filters simultaneously. For example:
- Female influencers
- In Riyadh region
- Lifestyle category
- With 10,000-50,000 followers
- Rate between 500-2000 SAR

## Creating Campaigns

### Creating a New Campaign

1. Navigate to the **Campaigns** page
2. Click **Create Campaign**
3. Fill in campaign details:

   **Campaign Information:**
   - **Title:** Campaign name (required)
   - **Description:** Campaign details (optional)

   **Select Influencers:**
   - Browse the list of influencers
   - Check the boxes next to influencers you want to include
   - You can select multiple influencers

   **Choose Export Fields:**
   - Select which fields to include in the PDF:
     - Name
     - Username
     - Platforms
     - Category
     - Gender
     - Phone Number
     - Advertising Rate
     - Followers Count
     - Region
     - Notes
   - At least one field must be selected

4. Click **Create Campaign**

### Viewing Campaigns

On the Campaigns page, you'll see cards for each campaign showing:
- Campaign title and description
- Number of influencers
- Number of selected fields
- Creation date

### Editing a Campaign

1. Find the campaign card
2. Click the **Edit** button
3. Modify the details
4. Click **Save**

### Duplicating a Campaign

1. Find the campaign card
2. Click the **Duplicate** button
3. A copy will be created with "(Copy)" appended to the title
4. Edit the duplicate as needed

### Deleting a Campaign

1. Find the campaign card
2. Click the **Delete** button
3. Confirm the deletion

## Exporting PDFs

### Generating a Campaign PDF

1. Navigate to the **Campaigns** page
2. Find the campaign you want to export
3. Click the **Export PDF** button
4. The PDF will be generated and downloaded automatically

### PDF Contents

The generated PDF includes:

**Title Page:**
- Campaign name
- Creation date
- Logo placeholder (customizable)

**Influencer Table:**
- All selected influencers
- Only the fields you chose during campaign creation
- Formatted data:
  - Rates shown in SAR currency
  - Followers shown with K/M notation (e.g., 10.5K, 1.2M)
  - Platforms shown as comma-separated list

**Summary Page:**
- Total number of influencers
- Total reach (combined followers)
- Average advertising rate
- Date range

### PDF Styling

- **Font:** IBM Plex Sans (supports Arabic and Latin)
- **Layout:** Professional table format
- **Colors:** Alternating row colors for readability
- **Headers:** Page headers with campaign name
- **Footers:** Page numbers

## Bulk Operations

### Selecting Multiple Influencers

1. Go to the Influencers page
2. Check the boxes next to influencers you want to select
3. You can select as many as needed

### Bulk Editing

1. Select multiple influencers (checkboxes)
2. Click the **Bulk Edit** button
3. Choose what to update:
   - **Category:** Change category for all selected
   - **Region:** Change region for all selected
   - **Gender:** Change gender for all selected
4. Select the new value from the dropdown
5. Click **Update**
6. All selected influencers will be updated

### Use Cases for Bulk Operations

- Update region for influencers who relocated
- Recategorize multiple influencers at once
- Correct gender information in bulk

## Import/Export Data

### Exporting Influencer Data

1. Go to the Influencers page
2. Click the **Export** dropdown button
3. Choose format:
   - **Export to Excel:** Downloads .xlsx file
   - **Export to CSV:** Downloads .csv file
4. File will download automatically

**Exported Data Includes:**
- All influencer information
- Category names
- Region names
- Platform lists
- All fields

### Importing Influencer Data

#### Step 1: Download Template

1. Click the **Import** dropdown button
2. Select **Download Template**
3. A template file will download with the correct format

#### Step 2: Fill in Data

Open the template in Excel or Google Sheets and fill in:
- **name:** Influencer name (required)
- **username:** Username/handle (required)
- **platforms:** Comma-separated list (e.g., "Instagram,TikTok")
- **category:** Category name (must match existing or will be created)
- **gender:** "Male" or "Female"
- **phoneNumber:** Phone number (optional)
- **advertisingRate:** Number (e.g., 1500)
- **followersCount:** Number (e.g., 50000)
- **region:** Region name (must match existing or will be created)
- **notes:** Additional notes (optional)

#### Step 3: Import File

1. Click the **Import** dropdown button
2. Choose **Import from Excel** or **Import from CSV**
3. Select your filled template
4. Data will be validated and imported
5. You'll see a success message

### Import Tips

- Make sure column names match the template exactly
- Use existing category and region names when possible
- Platforms should be comma-separated without spaces
- Numbers should not include commas or currency symbols
- Required fields must not be empty

## Analytics

### Accessing Analytics

1. Click **Analytics** in the navigation bar
2. The dashboard will load with all metrics and charts

### Key Metrics

At the top of the page, you'll see four key metrics:

1. **Total Influencers:** Total number in database
2. **Total Campaigns:** Number of campaigns created
3. **Total Reach:** Combined followers across all influencers
4. **Average Rate:** Average advertising rate in SAR

### Charts and Visualizations

**Influencers by Category (Bar Chart)**
- Shows distribution across all 12 categories
- Helps identify which categories have the most influencers

**Influencers by Region (Bar Chart)**
- Shows top 10 regions by influencer count
- Helps identify geographic concentration

**Gender Distribution (Pie Chart)**
- Shows Male vs Female ratio
- Displays percentages

**Platform Distribution (Bar Chart)**
- Shows how many influencers use each platform
- Note: Influencers can use multiple platforms

**Advertising Rate Ranges (Bar Chart)**
- Groups influencers by rate ranges:
  - 0-500 SAR
  - 500-1000 SAR
  - 1000-2000 SAR
  - 2000-5000 SAR
  - 5000+ SAR

**Followers Distribution (Bar Chart)**
- Groups influencers by follower ranges:
  - 0-10K
  - 10K-50K
  - 50K-100K
  - 100K-500K
  - 500K-1M
  - 1M+

### Using Analytics for Decisions

- **Budget Planning:** Use rate distribution to plan campaign budgets
- **Target Audience:** Use region and category data to find right influencers
- **Market Gaps:** Identify underrepresented categories or regions
- **Pricing Strategy:** Compare rates across categories and follower counts

## Tips & Best Practices

### Data Entry

1. **Be Consistent:** Use consistent naming conventions
2. **Verify Data:** Double-check follower counts and rates
3. **Update Regularly:** Keep influencer data current
4. **Use Notes:** Add important information in the notes field

### Organization

1. **Use Categories:** Properly categorize influencers for easier filtering
2. **Regional Data:** Keep region information accurate
3. **Platform Info:** Select all platforms the influencer uses

### Campaign Management

1. **Descriptive Titles:** Use clear, descriptive campaign names
2. **Add Descriptions:** Include campaign details and dates
3. **Select Relevant Fields:** Only include necessary fields in PDFs
4. **Review Before Export:** Check influencer selection before generating PDF

### Filtering

1. **Start Broad:** Begin with basic filters, then narrow down
2. **Combine Filters:** Use multiple filters for precise results
3. **Save Campaigns:** Instead of re-filtering, save as campaigns

### Import/Export

1. **Regular Backups:** Export data regularly as backup
2. **Use Templates:** Always use the provided template for imports
3. **Validate Data:** Check data before importing
4. **Test Small:** Test with a few rows before bulk import

### Performance

1. **Pagination:** Use pagination for large datasets
2. **Specific Filters:** Use filters to reduce displayed data
3. **Regular Cleanup:** Remove outdated influencers

## Keyboard Shortcuts

- **Search:** Click search bar or start typing
- **Escape:** Close open dialogs/modals
- **Enter:** Submit forms

## Common Questions

### Can I undo a deletion?
No, deletions are permanent. Export your data regularly as backup.

### How many influencers can I add?
There's no hard limit, but performance is optimized for thousands of influencers.

### Can I customize the PDF logo?
Yes, you can modify the PDF generator code to include your logo.

### What if I need a new category?
Click "Add New" next to the category dropdown when adding/editing an influencer.

### Can I export a single influencer?
Yes, create a campaign with just that one influencer and export the PDF.

### How do I change the currency?
The currency (SAR) is set in the code. You can modify it in the PDF generator.

### Can multiple users access the platform?
The current version is single-user. Multi-user support is a future enhancement.

## Troubleshooting

### Problem: Can't add influencer
- **Solution:** Check that all required fields are filled
- Ensure at least one platform is selected

### Problem: Filters not working
- **Solution:** Click "Apply Filters" after selecting options
- Try resetting filters and applying again

### Problem: PDF not downloading
- **Solution:** Check browser's download settings
- Ensure pop-ups are not blocked
- Try a different browser

### Problem: Import failing
- **Solution:** Verify file format matches template
- Check for required fields
- Ensure no special characters in data

### Problem: Analytics not loading
- **Solution:** Refresh the page
- Check that you have influencers in database

## Getting Help

For additional support:
- Review this manual
- Check the README.md file
- Review error messages carefully
- Contact support team

---

**Version:** 1.0.0  
**Last Updated:** October 2, 2025
