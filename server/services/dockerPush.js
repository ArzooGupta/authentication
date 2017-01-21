var status;
var dkrPush;
var dockerPush=function(imageID, callback) {
        const spawn=require('child_process').spawn;
        const path = require('path');
        //var imageName = folderPath.split('/');
         //   imageName=imageName[imageName.length-1];
        //ls -lh /usr
        console.log("pushing images");
        imageID.map((item)=>
        {
            item=item.replace('\n','');
        console.log('docker push 172.23.238.253:5000/ '+item);
         dkrPush=spawn('docker', ['push','172.23.238.253:5000/'+item,]);

        

       dkrPush.stdout.on('data', (data)=> {
            status=`${data}`;
           console.log(`${data}`);
        });
       });

        dkrPush.on('close', (code) => {
            console.log(`Status:${code}`);
            if(code !== 0) { callback(new Error('"docker push" exited with code', code)); return; }
            console.log("pushed images");
            // status = status.replace('Successfully built ','');
            callback(null);
        });
    
}
module.exports = dockerPush;