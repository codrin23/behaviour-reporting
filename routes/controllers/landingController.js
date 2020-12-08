import { computeUsersMoodForDate } from '../../services/summaryService.js';

const landing = async({render, session}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');

  const previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 1);

  const moodSummaryToday = await computeUsersMoodForDate(new Date().toISOString().substr(0, 10));
  const moodSummaryYesterday = await computeUsersMoodForDate(previousDay.toISOString().substr(0, 10));

  render('index.ejs', {authenticated, user, moodSummaryToday, moodSummaryYesterday});
};
 
export { landing };