import { CronJob} from "cron";

const job = new CronJob
('0 */1 * * * *',function(){
console.log("Working");
}
)
job.start