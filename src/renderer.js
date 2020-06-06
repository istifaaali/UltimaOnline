const startbutton = document.getElementById("start-button");
//const gitPullOrClone = require('git-pull-or-clone');
const { DownloaderHelper } = require('node-downloader-helper');
const percentage_text = document.getElementById("percentage");
const downloadinfo = document.getElementById("download-info");
var percentage = 0;
var state = "start";

async function start(){
    if(state === "start"){
        startbutton.classList.remove('btn-primary');
        startbutton.classList.add('btn-danger');
        startbutton.innerText = "Cancel";
        percentage += 1;
        percentage_text.innerText = `${percentage}%`
        NProgress.set(percentage/100);
        state = "Cancel"

        const dl = new DownloaderHelper('https://github.com/andreakarasho/ClassicUO/releases/download/ClassicUO-dev-preview/ClassicUO-dev-preview-release.zip', `${__dirname}/downloads/`);
        dl.on('end', () => console.log('Download Completed'))
        dl.start();

    }else if(state === "Cancel"){
        NProgress.done();
        percentage = 0;
        percentage_text.innerText = ""
        startbutton.classList.remove('btn-danger');
        startbutton.classList.add('btn-primary');
        startbutton.innerText = "Install";
        state = "start"
    }



    //NProgress.configure({ parent: prograsscontainer });
 }

startbutton.onclick = start;
