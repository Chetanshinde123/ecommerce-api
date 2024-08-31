export const getTokenFromHeader = (req, res) => {
  // ----------- Use to know what all data is in header -----------------------
  // console.log(req.headers)

  // get token from header
  const token = req?.headers?.authorization?.split(" ")[1];
  // token is place in authorization varible
  //   console.log(token);


  // This condition would not work if we have not used conditional statement in token = req?.headers?.authorization?.split(" ")[1];
  if (token === undefined) { 
    return "No token found in the Header";
  } else {
    return token;
  }
};
