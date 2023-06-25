import axios from "axios";
import newtokens from "../Modals/token.js";
import { CronJob } from "cron";


export const CreateSearch = async(req,res) =>
{
    try{
        const {acesstoken} = req.body;
        const options = {
            method: 'POST',
            url: 'https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/create',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '93e0855041mshfb8edac351860bep195e9djsn00b493579d95',
              'X-RapidAPI-Host': 'skyscanner-api.p.rapidapi.com'
            },
            data: {
              query: {
                market: 'UK',
                locale: 'en-GB',
                currency: 'EUR',
                queryLegs: [
                  {
                    originPlaceId: {iata: 'LHR'},
                    destinationPlaceId: {iata: 'DXB'},
                    date: {
                      year: 2023,
                      month: 9,
                      day: 20
                    }
                  }
                ],
                cabinClass: 'CABIN_CLASS_ECONOMY',
                adults: 2,
                childrenAges: [3, 9]
              }
            }
          };         
              const response = await axios.request(options);
              console.log(response.data);
            const newtoken = new newtokens
            ({
               acesstoken:response.data.sessionToken
            })    
            await newtoken.save();
            return res.send(response.data);
          } catch (error) {
              console.error(error);
          }
    }
     
    export const pollasearch = async (req,res) =>
    {
      const{id} = req.body
      try{
        const user = await newtokens.find({_id:id}).exec();
        
        const options = {
          method: 'POST',

          url: `https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/poll/${user[0].acesstoken}`,
          headers: {
            'X-RapidAPI-Key': '93e0855041mshfb8edac351860bep195e9djsn00b493579d95',
            'X-RapidAPI-Host': 'skyscanner-api.p.rapidapi.com'
          }
        };

           const response = await axios.request(options);
          console.log(response.data);
          return res.send(response.data) 
        } catch (error) {
          console.error(error);
        }
      }


      const job = new CronJob
      ('0 */1 * * * *',function(){
        newtokens.updateOne({}, {$unset: {acesstoken : true}}).exec(); 
        console.log("You will see this message every minute");
      });
      job.start();

