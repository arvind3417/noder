const http = require("http");
const fs = require("fs");
var requests = require("requests"); 

const homefile = fs.readFileSync("home.html", "utf-8")
// The down thing isn't working need to be analysed
// const replaceVal = (tempVal,orgVal) => {
// let temperat = tempVal.replace(" {%tempval%} ", orgVal.main.temp);
// temperat = temperat.replace(" {%tempmin%} ", orgVal.main.temp_min);
// temperat = temperat.replace(" {%tempmax%} ", orgVal.main.temp_max);
// temperat = temperat.replace(" {%location%} ", orgVal.name);
// temperat = temperat.replace(" {%country%} ", orgVal.sys.country);
// return temperat;
// }
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=c47e3e5661455101ba53bea5686b0e3b") 
            .on('data',  (chunk) => {
                const objdata = JSON.parse(chunk)
                const arrd = [objdata]
                var realTimeData = homefile.replace("{%tempval%}",arrd[0].main.temp).replace("{%tempmin%}",arrd[0].main.temp_min).replace("{%tempmax%}",arrd[0].main.temp_max).replace("{%location%}",arrd[0].name).replace("{%country%}",arrd[0].sys.country);

                // console.log(arrd[0].main.temp);  i guess this should be given to orgVal
                //  i.e. let orgVal =  console.log(arrd[0].main.temp);
                // const real = arrd.map((val) => replaceVal(homefile, val)).join("");
                    res.write(realTimeData); 
                   

                // console.log(realTimeData); gives the written html file from backend values 
            })
            .on('end',  (err) => { 
                if (err) return console.log('connection closed due to errors', err);
                res.end(); //closes the connection (server)
                // console.log('end');
            });

            
    }

});
server.listen(8000, "127.0.0.1");