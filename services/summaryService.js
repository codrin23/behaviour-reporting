import { executeQuery } from '../database/database.js';

const computeWeekMorningSummary = async (userId, startingDate, endingDate) => {
    const res = await executeQuery("SELECT AVG(sleep_duration)::numeric(10,2) AS sleep_duration_avg, AVG(sleep_quality)::numeric(10,2) AS sleep_quality_avg, AVG(generic_mood)::numeric(10,2) AS generic_mood_avg FROM morning_reports WHERE user_id=$1 AND reporting_date >= $2 AND reporting_date <= $3;", userId, startingDate, endingDate);
    if (res.rowCount === 0) {    
      
      return null;
    }

    const summaryResult = res.rowsOfObjects()[0];
    if (summaryResult.sleep_duration_avg === null) {

        return null;
    }
    
    return summaryResult;
}

const computeWeekEveningSummary = async (userId, startingDate, endingDate) => {
    const res = await executeQuery("SELECT AVG(sports_and_exercise_duration)::numeric(10,2) AS sports_and_exercise_duration_avg, AVG(studying_duration)::numeric(10,2) AS studying_duration_avg, AVG(generic_mood)::numeric(10,2) AS generic_mood_avg FROM evening_reports WHERE user_id=$1 AND reporting_date >= $2 AND reporting_date <= $3;", userId, startingDate, endingDate);
    if (res.rowCount === 0) {    
      
      return null;
    }

    const summaryResult = res.rowsOfObjects()[0];
    if (summaryResult.sports_and_exercise_duration_avg === null) {

        return null;
    }
    
    return summaryResult;
}

const computeMonthMorningSummary = async (userId, month, year) => {
    const res = await executeQuery("SELECT AVG(sleep_duration)::numeric(10,2) AS sleep_duration_avg, AVG(sleep_quality)::numeric(10,2) AS sleep_quality_avg, AVG(generic_mood)::numeric(10,2) AS generic_mood_avg FROM morning_reports WHERE user_id=$1 AND date_part('year', reporting_date) = $2 AND date_part('month', reporting_date) = $3;", userId, month, year);
    if (res.rowCount === 0) {    
      
      return null;
    }
    
    const summaryResult = res.rowsOfObjects()[0];
    if (summaryResult.sleep_duration_avg === null) {

        return null;
    }
    
    return summaryResult;
}


const computeMonthEveningSummary = async (userId, month, year) => {
    const res = await executeQuery("SELECT AVG(sports_and_exercise_duration)::numeric(10,2) AS sports_and_exercise_duration_avg, AVG(studying_duration)::numeric(10,2) AS studying_duration_avg, AVG(generic_mood)::numeric(10,2) AS generic_mood_avg FROM evening_reports WHERE user_id=$1 AND date_part('year', reporting_date) = $2 AND date_part('month', reporting_date) = $3;", userId, month, year);
    if (res.rowCount === 0) {    
      
      return null;
    }
    
    const summaryResult = res.rowsOfObjects()[0];
    if (summaryResult.sports_and_exercise_duration_avg === null) {

        return null;
    }
    
    return summaryResult;
}

const computeLastWeekMorningSummary = async() => {
    const currentDate = new Date();
    const oneWeekBeforeDate = new Date();
    oneWeekBeforeDate.setDate(oneWeekBeforeDate.getDate() - 7);

    const res = await executeQuery("SELECT reporting_date, AVG(sleep_duration)::numeric(10,2) AS sleep_duration_avg, AVG(sleep_quality)::numeric(10,2) AS sleep_quality_avg, AVG(generic_mood)::numeric(10,2) AS generic_mood_morning_avg FROM morning_reports WHERE reporting_date >= $1 AND reporting_date <= $2 GROUP BY reporting_date;", oneWeekBeforeDate.toISOString().substr(0, 10) , currentDate.toISOString().substr(0, 10));
    if (res.rowCount === 0) {    
      
      return null;
    }
    
    return res.rowsOfObjects();
}

const computeLastWeekEveningSummary = async() => {
    const currentDate = new Date();
    const oneWeekBeforeDate = new Date();
    oneWeekBeforeDate.setDate(oneWeekBeforeDate.getDate() - 7);

    const res = await executeQuery("SELECT reporting_date, AVG(sports_and_exercise_duration)::numeric(10,2) AS sports_and_exercise_duration_avg, AVG(studying_duration)::numeric(10,2) AS studying_duration_avg, AVG(generic_mood)::numeric(10,2) AS generic_mood_evening_avg FROM evening_reports WHERE reporting_date >= $1 AND reporting_date <= $2 GROUP BY reporting_date;", oneWeekBeforeDate.toISOString().substr(0, 10) , currentDate.toISOString().substr(0, 10));
    if (res.rowCount === 0) {    
      
      return null;
    }
    
    return res.rowsOfObjects();
}

const computeEveningSummaryForUsersForDate = async (date) => {
    const res = await executeQuery("SELECT AVG(sports_and_exercise_duration)::numeric(10,2) AS sports_and_exercise_duration_avg, AVG(studying_duration)::numeric(10,2) AS studying_duration_avg, AVG(generic_mood)::numeric(10,2) AS generic_mood_evening_avg FROM evening_reports WHERE reporting_date = $1 GROUP BY reporting_date;", date);
    if (res.rowCount === 0) {    
      
      return null;
    }
    
    const summaryResult = res.rowsOfObjects()[0];
    if (summaryResult.sports_and_exercise_duration_avg === null) {

        return null;
    }
    
    return summaryResult;
}

const computeMorningSummaryForUsersForDate = async (date) => {
    const res = await executeQuery("SELECT AVG(sleep_duration)::numeric(10,2) AS sleep_duration_avg, AVG(sleep_quality)::numeric(10,2) AS sleep_quality_avg, AVG(generic_mood)::numeric(10,2) AS generic_mood_morning_avg FROM morning_reports WHERE reporting_date = $1 GROUP BY reporting_date;", date);
    if (res.rowCount === 0) {    
      
      return null;
    }
    
    const summaryResult = res.rowsOfObjects()[0];
    if (summaryResult.sleep_duration_avg === null) {

        return null;
    }
    
    return summaryResult;
}

const computeUsersMoodForDate = async(date) => {
    const resMorning = await executeQuery("SELECT AVG(generic_mood)::numeric(10,2) AS generic_mood_morning_avg FROM morning_reports WHERE reporting_date = $1 GROUP BY reporting_date;", date);
    const resEvening = await executeQuery("SELECT AVG(generic_mood)::numeric(10,2) AS generic_mood_evening_avg FROM evening_reports WHERE reporting_date = $1 GROUP BY reporting_date;", date);

    return {
        morning_mood_avg: resMorning.rowCount && resMorning.rowsOfObjects()[0].generic_mood_morning_avg,
        evening_mood_avg: resEvening.rowCount && resEvening.rowsOfObjects()[0].generic_mood_evening_avg
    };
}

export { computeWeekMorningSummary, computeWeekEveningSummary, computeMonthMorningSummary, computeMonthEveningSummary, computeLastWeekMorningSummary, computeLastWeekEveningSummary, computeEveningSummaryForUsersForDate, computeMorningSummaryForUsersForDate, computeUsersMoodForDate };