import { executeQuery } from '../database/database.js';

const addMorningReport = async(morningReport) => {

  const existingReport = await getMorningReportForDate(morningReport.userId, morningReport.reportingDate);

  if (existingReport) {

    await executeQuery("DELETE FROM morning_reports WHERE user_id=$1 AND reporting_date=$2;", morningReport.userId, morningReport.reportingDate);
  }

  await executeQuery("INSERT INTO morning_reports (user_id, reporting_date, sleep_duration, sleep_quality, generic_mood) VALUES ($1, $2, $3, $4, $5)", 
    morningReport.userId, morningReport.reportingDate, morningReport.sleepDuration, morningReport.sleepQuality, morningReport.genericMood);
}

const addEveningReport = async(eveningReport) => {

  const existingReport = await getEveningReportForDate(eveningReport.userId, eveningReport.reportingDate);
  
  if (existingReport) {
  
    await executeQuery("DELETE FROM evening_reports WHERE user_id=$1 AND reporting_date=$2;", eveningReport.userId, eveningReport.reportingDate);
  }

  await executeQuery("INSERT INTO evening_reports (user_id, reporting_date, sports_and_exercise_duration, studying_duration, regularity_and_quality_eating, generic_mood) VALUES ($1, $2, $3, $4, $5, $6)", 
    eveningReport.userId, eveningReport.reportingDate, eveningReport.sportsAndExerciseDuration, eveningReport.studyingDuration, eveningReport.regularityAndQualityEating, eveningReport.genericMood);
}

const getMorningReportForDate = async(userId, date) => {
  const res = await executeQuery("SELECT * FROM morning_reports WHERE user_id=$1 AND reporting_date=$2;", userId, date);
  if (res.rowCount === 0) {
      
      return null;
  }

  return res.rowsOfObjects()[0];
}

const getEveningReportForDate = async(userId, date) => {
  const res = await executeQuery("SELECT * FROM evening_reports WHERE user_id=$1 AND reporting_date=$2;", userId, date);
  if (res.rowCount === 0) {    
    
    return null;
  }
  
  return res.rowsOfObjects()[0];
}

export { addMorningReport, addEveningReport, getMorningReportForDate, getEveningReportForDate};