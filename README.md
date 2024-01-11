
# Raffish Excel App

### Steps to Run
1. Run **live-server** (VS-Code plug-in) frontend folder
2. Run **flask --app src/app.py --debug run** from the backend folder
3. Install a CORS plugin for any browser for FE and BE communication

### GUI
The front end has a file upload box and one button for selecting a file from the PC. Once one selects an excel file, it renders it and shows it on the web-page as a long vertical scrolling table. After checking boxes of the rows corresponding to the rows one would like to import, click on the **Submit Selection** button. This makes a call to the backend which makes a POST request to the Sprinklr API. The response from the API is parsed. The application doesn't stop if an import fails. It tries to import all the selected campaigns one-by-one and at the end opens an alert box telling how many of the imports were successful and how many failed.

### Choices
1. My initial attempt was to do the whole project with Javascript only, but I soon realized my limited knowledge in JS and that I would code much faster in Python for the backend. So, I stuck to JS for FE but used Python for BE.

2. I got a couple CORS issues but eventually fixed them with [this](https://chromewebstore.google.com/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) plugin on Chrome.

3. I tried to use as little library as possible. For FE I used SheetJS. For BE I used Pandas for handling Excels.

4. I know Pandas is an overkill for this project and is slow, but for an interview assignment I went with it coz I was most comfortable with it with no learning curve.

### Choices, Assumptions in Parsing the EXCEL
I had a lot of questions on this whole segment. I made the best possible choices that made sense without asking for more information.
1. Campaigns and Sub-Campaigns
    - How to decide if a campaign is a sub-campaign of another campaign?
    - I created a *StemText* based on the campaign names(logic to be found in code). Only if this StemText appears again, this is taken as a subcampaign of the previously made campaign.
    - As a result of above logic, StayPeriod for a campaign has always become a campaign with (BookingPeriod) being made a Sub-Campaign if StayPeriod appeared first and vice-versa.

7. Campaign Title
    - Any information like "quarter", "year", "booking period", "Test" strings are removed from the percolate title and only the core string and the region (eg:EMEA) is kept.
    - Title now is a concatenation of workfront_no, scope, campaign_text and year.

2. Campaign Briefs
    - Adding Briefs didn't work. It always return 400 error code (Even with Sprinklr's Postman Collection and with the their example CURL request). This did frustrate me a little bit.

3. Custom Fields
    - Brand and Channel are added as partner custom fields. Even though the API gives a success although they did not show up in the GUI, but they do appear using the **Fetch Campaign** API.

4. ID in percolate is the Workfront Number.
5. Startdate and Enddate assumes UTC time.
6. Scope
    - 3 different scopes are used: Internal, Members, B2B and B2C.
    - First occurence of B2B makes the scope B2B.
    - All blanks are marked "B2C" in campaign name.
    - For each campaign, only the first scope that appears in **Audience** column is chosen.

8. Tags: The following are used as Tags
    - country
    - year
    - quarter
    - type (represents the *Campaign Type* column of Percolate)
    - objective (represents the *Primary Objective* column of Percolate)

9. I kept most of the processing on the backend side to keep the FE as lightweight as I could, but there might be some best practices of splitting of responsibilities between BE and FE which I was not aware of.

10. After one flow of the UI, the table stays in the webpage, if the user chooses to try again.

### With more time
1. Would have done error handling, retries and exception handling better.
2. Would have handled null checks better. I wasn't sure where is best to handle them. So, there is a bit of it everywhere.
3. Used a different excel paser for BE.

### Parts I was stuck at
1. CORS issue, it has been a while I handled these errors and I forgot how I did it back then. After about 3 hours of here and there, I finally managed to get past it.

2. I was coding in AWS EC2 machine. I wasted some time reading a file from local because the code was expecting it in the EC2 machine and I was expecting it in my personal Windows machine :P

3. Got distracted a bit with VueJS and NestJS but soon deciding not to pursue them coz seems they are quite powerful and vast and I didn't wanna implement something I don't completely understand.

4. Wasted about another 3 hours because of a wrong documentation on the Sprinklr API page. The campaign payload Status element has to be DRAFT/APPROVED **all caps**. The documentation mentioned CamelCase, I used the same and got 400 Bad Request. All the time debugging I assumed the error was in Auth or JS Fetch but didn't doubt the documentation.

# Some screenshots

![Alt text](/files/doc_files/frontend.png)
*Front End with an empty table before fileload*

![Alt text](/files/doc_files/table_with_checkboxes.png)
*Table with checkboxes after file load*

![Alt text](/files/doc_files/text_with_selection_count.png)
*Counter showing number of selected rows*

![Alt text](/files/doc_files/success_failure_count.png)
*Alert box with Success Failure count*