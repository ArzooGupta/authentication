var dab;
var dockerBuild=function(folderPath, callback) {
        const spawn=require('child_process').spawn;
        const path = require('path');
        //ls -lh /usr

        const dockerBuld=spawn('docker-compose', ['bundle'], {cwd:folderPath});
        console.log("building bundle");
        dockerBuld.stderr.on('data', (data)=> {
             dab=`${data}`;
             console.log(`${data}`);

        });

        dockerBuld.stdout.on('data', (data)=> {
            dab=`${data}`;
           console.log(`${data}`);
        });

        dockerBuld.on('close', (code) => {
            console.log(`Status:${code}`);
            if(code !== 0) { callback(new Error('"docker bundle" exited with code', code)); return; }
              dab = dab.replace('Wrote bundle to ','');
              dab = dab.replace('.dab','');
            callback(null,dab);
        });
}
module.exports = dockerBuild;