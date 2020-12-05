const landing = async({render, session}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');
  render('index.ejs', {authenticated, user});
};
 
export { landing };