const startbutton = document.getElementById("start-button");
//const gitPullOrClone = require('git-pull-or-clone');
const { DownloaderHelper } = require('node-downloader-helper');
const decompress = require('decompress');
const fs = require('fs');
const percentage_text = document.getElementById("percentage");
const downloadinfo = document.getElementById("download-info");
var percentage;
var state = "start";
var github1,github2;
var data,data2;

let settingdata = {
    "username":  "",
    "password":  "",
    "ip":  "login.cataclysmuo.com",
    "port":  2593,
    "ultimaonlinedirectory":  "",
    "clientversion":  "5.0.8.3",
    "lastcharactername":  "",
    "cliloc":  "Cliloc.enu",
    "lastservernum":  1,
    "fps":  60,
    "window_position":  null,
    "window_size":  null,
    "is_win_maximized":  true,
    "profiler":  true,
    "saveaccount":  false,
    "autologin":  false,
    "reconnect":  false,
    "reconnect_time":  0,
    "login_music":  true,
    "login_music_volume":  70,
    "shard_type":  0,
    "fixed_time_step":  true,
    "run_mouse_in_separate_thread":  true,
    "use_verdata":  false,
    "encryption":  0,
    "plugins": ["./extracted-files/Razor/Razor.exe"]
}


async function start(){
    if(state === "start"){
        data = 0;
        data2 = 0;
        percentage = 0;
        startbutton.classList.remove('btn-primary');
        startbutton.classList.add('btn-danger');
        startbutton.innerText = "Cancel";
        state = "Cancel"

        fs.mkdir("./downloads/", function(){
            console.log("Created Download Folder");
        });

        github1 = new DownloaderHelper('https://github.com/andreakarasho/ClassicUO/releases/download/ClassicUO-dev-preview/ClassicUO-dev-preview-release.zip', `./downloads/`);
        github2 = new DownloaderHelper('https://github.com/markdwags/Razor/releases/download/Razor-dev-preview/Razor-dev-preview.zip', `./downloads/`);
        github1.on('end', () => console.log('Download #1 Completed'))
        github2.on('end', () => console.log('Download #2 Completed'))

        github1.start().then(function(){
            github2.start().then(function(){
                if(state === "Cancel"){
                    if(data != 0){
                        data = 0;
                        percent = 0;
                    }
                    if(data2 != 0){
                        data2 = 0;
                        percent = 0;
                    }
                    percentage_text.innerText = `0%`

                    fs.mkdir("./extracted-files/", function(){
                        console.log("Created New Folder");
                    });

                    decompress('./downloads/ClassicUO-dev-preview-release.zip', './extracted-files/').then(function(){
                        NProgress.set(0.50);
                        percentage_text.innerText = `50%`
                        console.log('done extracting first file!');
                    }).then(function(){
                        fs.mkdir("./extracted-files/Razor", function(){
                            console.log("Create Razor Plugin Folder");
                        });
                        decompress('./downloads/Razor-dev-preview.zip', './extracted-files/Razor').then(function(){
                            NProgress.done();
                            percentage_text.innerText = `100%`
                            console.log('done extracting second zip-file!');
                        }).then(function(){
                            if(!fs.existsSync("./extracted-files/settings.json")){
                                console.log("Settings.json does not exist, generating....");
                                let received_setting_data = JSON.stringify(settingdata);
                                fs.writeFileSync('./extracted-files/settings.json', received_setting_data);
                                console.log("Generated JSON file!");
                            }else if(fs.existsSync("./extracted-files/settings.json")){
                                console.log("Settings.json already exists!");
                                //const settingsfile = require("./extracted-files/settings.json");
                            }  

                            startbutton.classList.remove('btn-danger');
                            startbutton.classList.add('btn-primary');
                            startbutton.innerText = "Install";
                            percentage_text.innerText = ``
                            state = "start"
                            data = 0;
                            data2 = 0;
                            percent = 0;
                        });
                    })
                }
            });
        });

        github1.on("progress", function(){
            data += 1;
            var percent = (data/1933) * 100
            percentage_text.innerText = `${Math.round(percent)}%`
            NProgress.set(percent/100);
        })

        github2.on("progress", function(){
            data2 += 1;
            var percent = (data2/287) * 100
            percentage_text.innerText = `${Math.round(percent)}%`
            NProgress.set(percent/100);
        })



    }else if(state === "Cancel"){
        NProgress.done();
        data = 0;
        data2 = 0;
        github1.stop().then(function (){
            github2.stop()
        })


        percentage = 0;
        percentage_text.innerText = "0%"
        startbutton.classList.remove('btn-danger');
        startbutton.classList.add('btn-primary');
        startbutton.innerText = "Install";
        state = "start"
    }



    //NProgress.configure({ parent: prograsscontainer });
 }

startbutton.onclick = start;
