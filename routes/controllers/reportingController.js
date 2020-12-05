const startReporting = async({render, session}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');
  render('./reporting/reporting.ejs', {authenticated, user});
}

export {startReporting};