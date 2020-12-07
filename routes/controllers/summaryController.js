import { getWeekNumber, getDateOfISOWeek } from '../../utils/dateProcessor.js';
import { computeWeekMorningSummary, computeWeekEveningSummary, computeMonthMorningSummary, computeMonthEveningSummary } from '../../services/summaryService.js';

const showSummary = async({render, session}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');
  const currentDate = new Date();
  const aweek = `${currentDate.getFullYear()}-W${getWeekNumber(currentDate)}`;
  const amonth = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;

  const startingDate = getDateOfISOWeek(getWeekNumber(currentDate), currentDate.getFullYear());
  const endingDate = getDateOfISOWeek(getWeekNumber(currentDate) + 1, currentDate.getFullYear());
  endingDate.setDate(endingDate.getDate() - 1);


  console.log({startDate: startingDate.toISOString().substr(0, 10), endDate: endingDate.toISOString().substr(0, 10)});
  const currentWeekMorningSummary = await computeWeekMorningSummary(user.id, startingDate.toISOString().substr(0, 10), endingDate.toISOString().substr(0, 10));
  const currentWeekEveningSummary = await computeWeekEveningSummary(user.id, startingDate.toISOString().substr(0, 10), endingDate.toISOString().substr(0, 10));
  const currentMonthMorningSummary = await computeMonthMorningSummary(user.id, currentDate.getFullYear(), currentDate.getMonth() + 1);
  const currentMonthEveningSummary = await computeMonthEveningSummary(user.id, currentDate.getFullYear(), currentDate.getMonth() + 1);

  console.log({currentWeekMorningSummary, currentWeekEveningSummary, currentMonthMorningSummary, currentMonthEveningSummary});

  render("./summary/summary.ejs", {
      authenticated, user, aweek, amonth, 
      startingDate: startingDate.toDateString(), 
      endingDate: endingDate.toDateString(),
      currentWeekMorningSummary,
      currentWeekEveningSummary,
      currentMonthMorningSummary,
      currentMonthEveningSummary
    }
  );
}

const calculateSummary = async({render, session, request}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');
  const body = request.body();
  const params = await body.value;
  const aweek = params.get("aweek");
  const amonth = params.get("amonth");
  const startingDate = getDateOfISOWeek(Number(aweek.substr(6, 2)), Number(aweek.substr(0,4)));
  const endingDate = getDateOfISOWeek(Number(aweek.substr(6, 2)) + 1, Number(aweek.substr(0,4)));
  endingDate.setDate(endingDate.getDate() - 1);

  const currentWeekMorningSummary = await computeWeekMorningSummary(user.id, startingDate.toISOString().substr(0, 10), endingDate.toISOString().substr(0, 10));
  const currentWeekEveningSummary = await computeWeekEveningSummary(user.id, startingDate.toISOString().substr(0, 10), endingDate.toISOString().substr(0, 10));
  const currentMonthMorningSummary = await computeMonthMorningSummary(user.id, amonth.substr(0, 4), amonth.substr(5, 2));
  const currentMonthEveningSummary = await computeMonthEveningSummary(user.id, amonth.substr(0, 4), amonth.substr(5, 2));

  console.log({currentWeekMorningSummary, currentWeekEveningSummary, currentMonthMorningSummary, currentMonthEveningSummary});

  render("./summary/summary.ejs", {
    authenticated, user, aweek, amonth, 
    startingDate: startingDate.toDateString(), 
    endingDate: endingDate.toDateString(),
    currentWeekMorningSummary,
    currentWeekEveningSummary,
    currentMonthMorningSummary,
    currentMonthEveningSummary
    }
  );
}

export {showSummary, calculateSummary};