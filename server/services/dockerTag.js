var status;
var dkrTag;
var dockerTag=function(folderPath,imageID, callback) {
        const spawn=require('child_process').spawn;
        const path = require('path');
        var imageName = folderPath.split('/');
        imageName=imageName[imageName.length-1];
        imageName=imageName.replace('\n','');
        
        console.log("image name" +imageName);
        console.log("image id" +imageID);
        //ls -lh /usr
        imageID.map((obj)=>
        {
            obj=obj.replace('\n','');
        console.log('docker tag '+obj+' 172.23.238.253:5000/'+obj);

        dkrTag=spawn('docker', ['tag',obj,'172.23.238.253:5000/'+obj,]);


        dkrTag.stderr.on('data', (data)=> {
             status=`${data}`;
             console.log(`${data}`);

        });
        });
       dkrTag.stdout.on('data', (data)=> {
            status=`${data}`;
           console.log(`${data}`);
        });
   

        dkrTag.on('close', (code) => {
            console.log(`Status:${code}`);
            if(code !== 0) { callback(new Error('"docker tag" exited with code', code)); return; }
            // status = status.replace('Successfully built ','');
            callback(null,imageID);
        });
    
}
module.exports = dockerTag;