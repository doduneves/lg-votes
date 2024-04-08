
## Questions

  

1. Discuss your strategy and decisions implementing the application. Please, considertime complexity, effort cost, technologies used and any other variable that you understand important on your development process.

**So, as a web app with BE and FE, usually I choose React on the Front-End and a API-based BE framework.**

**But it is a web app with the UI matters and need a small back-end with some logics about dealing with CSV data, so I thought about using a framework that both Back-End and Front-End works and I chose NextJS as it is a Front-End based framework but with Server Side rendering. That makes it able to perform the small Back-End.**

**As the CSV files works like Database tables, I simulate an API at the back-end, but besides dealing with a DB, it deals with the CSV.**

**The Back-End do all the CSV data manipulation to deliver the required values to Front-End. And the FE just shows then.**

2. How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or“Co-Sponsors”?

**"Bills voted on Date" it will need a new logic to that "group by" requirements. "The Co-Sponsors" I guess it will just need a new column on the Bills interface and also in the table shown on the UI.**

3. How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?

**It will need to perform a CSV generator of this lists and then, this new CSVs used on the current logic. This would be the least effort solution.**

4. How long did you spend working on the assignment?

**Few hours on Saturday chosing the technologies and starting the project. Some hours on Sunday doing the web app the project requires. And now, few hours on Monday refactoring and playing with the project. I had fun, for sure :)**