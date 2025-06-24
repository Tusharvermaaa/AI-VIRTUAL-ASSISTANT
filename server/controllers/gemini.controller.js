import moment from "moment";

import { geminiresponse } from "../gemini.js";
import userModel from "../models/user.model.js";
//  dont forgot to apply middleware on this route of controller , post request
const geminicontroller = async (req, res) => {
  try {
    // return res.json({status:"this controller is called "})
    const prompt = req.body.query;
    console.log(prompt , " celebreate");
    const user = await userModel.findById(req.userid).select("-password");
    const username = user.name;
    const assistantname = user.assistantname;

    const result = await geminiresponse(prompt, assistantname, username);
    // console.log("GEMINI RAW RESPONSE:", result); // 🔍 LOG THIS
    const cleaned = result?.replace(/```json|```/g, "")?.trim()?.replace(/\n{2,}/g, "\n");

    // console.log("type of cleanded",typeof cleaned );
    // console.log("cleaned" , cleaned )
let geminiresult;
try {
  geminiresult = JSON.parse(cleaned);
} catch (err) {
  return res.status(400).json({
    response: "Sorry, Gemini returned an invalid format I couldn't understand."
  });
}
    // const jsonMatch = result.match(/{[\s\s]*}/); // checks for valid json object
    // if (!jsonMatch) {
    //   return res
    //     .status(400)
    //     .json({ response: "sorry i have not understood the query  , response parsing error" });
    // }
    // const geminiresult = JSON.parse(jsonMatch[0]);
    const type = geminiresult.type;
    const userInput=geminiresult.userinput;
    const now = moment();

    switch (type) {
      case "get_time":
        return res.json({  type , userInput , response: `current time is ${now.format("hh:mm:ss A")}` });
        break;
      case "get_date":

        console.log("date today called");
        return res.json({ type , userInput ,respones: `today date is ${now.format("YYYY-MM-DD")}` });
        break;
      case "get_day":
        const dayMap = {
          1: "sunday",
          2: "monday",
          3: "tuesday",
          4: "wednesday",
          5: "thursday",
          6: "friday",
          7: "saturday",
        };
        return res.json({ type , userInput ,response: `currnet day is ${dayMap[now.day() + 1]}`});
        break;
      case "get_month":
        const monthsMap = {
          0: "January",
          1: "February",
          2: "March",
          3: "April",
          4: "May",
          5: "June",
          6: "July",
          7: "August",
          8: "September",
          9: "October",
          10: "November",
          11: "December",
        };
        return res.json({type , userInput ,response: `${monthsMap[now.month()]}`});

      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather_show":
      case "google_search":
      case "youtube_search":
      case "general":
      case "youtube_play":
         return res.json({
            type, userInput , 
            response:`${geminiresult.response}`
         })
        default :
           return res.json({
            type , userInput, 
            response:`sorry ${username}  ,I did not understand the command `
           })
    }
  } catch (error) {
    console.log("error in gemini controller , ", error);
  }
};

export default geminicontroller;
