var status;
var dockerDeploy=function(folderPath,dabFile, callback) {
        const spawn=require('child_process').spawn;
        const path = require('path');
        console.log(dabFile);
        //ls -lh /usr
        dabFile=dabFile.replace('\n','');
        console.log('docker stack deploy '+dabFile);
        const dkrDeploy=spawn('docker', ['stack','deploy',dabFile], {cwd:folderPath});

        dkrDeploy.stderr.on('data', (data)=> {
             status=`${data}`;
             console.log(`${data}`);

        });

        dkrDeploy.stdout.on('data', (data)=> {
            status=`${data}`;
            console.log(`${data}`);
        });

        dkrDeploy.on('close', (code) => {
            console.log(`Status:${code}`);
            if(code !== 0) { callback(new Error('"docker bundle" exited with code', code)); return; }
             
            callback(null,"Completed");
        });
}
module.exports = dockerDeploy;