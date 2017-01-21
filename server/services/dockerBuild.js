var imageID=[];
var image;
var dockerBuild=function(folderPath, callback) {
        const spawn=require('child_process').spawn;
        const path = require('path');
        //ls -lh /usr
        var imageName = folderPath.split('/');
            imageName=imageName[imageName.length-1];

        const dockerBuld=spawn('docker-compose', ['build'], {cwd:folderPath});

        dockerBuld.stderr.on('data', (data)=> {
             image=`${data}`;
             console.log(`${data}`);

        });

        dockerBuld.stdout.on('data', (data)=> {
            image=`${data}`;
           console.log(`${data}`);
           if(image.includes('Successfully built '))
           {
           imageID.unshift(image.replace('Successfully built ',''));
            }

        });

        dockerBuld.on('close', (code) => {
            console.log(`Status:${code}`);
            if(code !== 0) { callback(new Error('"docker building" exited with code', code)); return; }
            // imageID.unshift(image.replace('Successfully built ',''));

             //imageName=imageName.replace('\n','');
             //console.log(imageID);
             //console.log(imageName);
            callback(null,imageID);
        });
}
module.exports = dockerBuild;