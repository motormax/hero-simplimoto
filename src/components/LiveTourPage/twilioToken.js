import { jwt } from 'twilio';

const { AccessToken } = jwt;
const { VideoGrant } = AccessToken;

export function GetTwilioToken(identity) {
  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  const token = new AccessToken(
    process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    process.env.REACT_APP_TWILIO_API_KEY,
    process.env.REACT_APP_TWILIO_API_SECRET,
  );

  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  const grant = new VideoGrant();
  token.addGrant(grant);
  return token.toJwt();
}
