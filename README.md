# Playwright Project

This is a personal project using [Playwright](https://playwright.dev/) for end-to-end testing and automation.

## Project Structure

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd playwright# playwright
   ```
2. Install dependencies:
   npm install
3. To execute all tests:
   npx playwright test
4. To execute tests in ui mode
   npx playwright test --ui
   Running Tests in CI
   This project includes a GitHub Actions workflow located in .github/workflows/ to automate tests in CI/CD pipelines.

Project Highlights
Page Object Model: Organized page objects in the pages/ directory.
Data-Driven Testing: Uses JSON files in the data/ directory for test data.
Comprehensive Reporting: Generates detailed HTML reports in the playwright-report/ directory.

#####

SQL Test

1.  SELECT \*
    FROM CITY
    WHERE COUNTRYCODE = 'USA'
    AND POPULATION > 12500;
2.  SELECT DISTINCT
    p.product_name,
    l.location_name,
    l.city
    FROM Transactions t
    JOIN Products p ON t.product_id = p.product_id
    JOIN Locations l ON t.location_id = l.location_id
    WHERE t.transaction_date BETWEEN '2021-03-01' AND '2021-03-31';

####

function sumOfDigits(num) {
if (num === 0) return 0;
return (num % 10) + sumOfDigits(Math.floor(num / 10));
}
