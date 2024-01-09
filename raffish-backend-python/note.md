1. Binder for node packages seem a bit overwhelming. So decided to use JavaScript.
2. Got distracted a bit with VueJS and NestJS but soon deciding not to pursue them coz seems they are quite powerful and a lot to learn and I didn't wanna implement something I don't completely understand.
3. Wasted 2 hours reading a file because the file was in windows and the code was running in linux.
4. Wasted 3 hours trying to solve CORS error
   - way around, maybe try ExpressJS later with npm cors.
5. Wasted another 3 hours banging head on why campaign POST req
   is not working. But the problem was Draft/Approved should be
   all CAPS like this DRAFT/APPROVED. All the time I thought it is
   fetch() error from JS as a result of no-cors mode seeing 400 errorcode,
   but error was in the payload.

Commands

- npm init -y
- npm run devStart

Steps:
    1. Add reading Excel file in the app

TODO:
    1. Create a array of array in javascript
    2. Try to display it out.

    Then merge the above logic.

Choices:
    1. If Campaign Title Matches exactly, except the "Booking Period" or "Stay Period" string, only then, sub-campaigns are created.
    2. There is a column called: "Booking or Stay|||schema:1383551219579469649"
        5. Some Campaign title mentioned "Stay Period" but above column mentioned "Booking Period". I assumed the title is more accurate.
    4. I assumed that ID in percolate is the Workfront Number
    5. startdate and enddate assumes UTC time.
    6. Scope
        3 different scopes are used: Internal, Members,,B2B,B2C and Blank
        First occurence of B2B makes the scope B2B
        All blanks are marked "B2C" in campaign name
        For each campaign, only the first scope that appears in **Audience** column is chosen
    7. Title
        Any information like "quarter", "year", "booking period", "Test" strings are removed from the percolate title and only the core
        string and the region (eg:EMEA) is kept.
    8. Adding briefs didn't work. It always returned 404 not found.
    10. Brand and Channel are added as partner custom fields. API gives success although they do not show up in GUI.
    11. The script doesn't fail for any row. It handles it best way it can and moves to the next row.

TODO with more time:
    1. better error handling
    2. use different library for data churning to optimize for speed