const catalyst = require('zcatalyst-sdk-node')
module.exports = (context, basicIO) => {
  const catalystApp = catalyst.initialize(context)
  const requestDetails = catalystApp.userManagement().getSignupValidationRequest(basicIO)
  if (requestDetails) {
    if (requestDetails.user_details.email_id.includes('@smartosc.com')) {
      context.log("success sign-up");
      // The actions that occur in the event of a successful authentication can be customized
      basicIO.write(JSON.stringify({
        status: 'success',
        user_details:
             {
               first_name: requestDetails.user_details.first_name,
               last_name: requestDetails.user_details.last_name,
               email_id: requestDetails.user_details.email_id,
               role_identifier: 'App User', // If you want to override the default role, you can specify the role id/name here.
               org_id: '' // If you are providing the Org ID, make sure it is copied exactly from the console.
             }
      }))
    } else {
      context.log("fail sign-up");
      // The user has failed authentication
      basicIO.write(JSON.stringify({
        status: 'failure'
      }))
    }
  }
  context.log("end validation sign-up");
  context.close()
}