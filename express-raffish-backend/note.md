
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
    2. The booking or stay period is done based on this column: Booking or Stay|||schema:1383551219579469649
    3. Column:Tags|||schema:706953723560779707 is used for Tags