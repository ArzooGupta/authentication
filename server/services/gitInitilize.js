var status;
var gitInitilize=function(repoPath, callback) {
        const spawn=require('child_process').spawn;
        //ls -lh /usr
        // var res = repoName.split("/");
        // res=res[res.length-1];
        // const parent=spawn('pwd',{cwd: path});
        const gitinit=spawn('git', ['submodule','init'],{cwd:repoPath});
 
        gitinit.stderr.on('data', (data)=> {
             status=`${data}`;
             console.log(status);
    
        });

       gitinit.stdout.on('data', (data)=> {
            status=`${data}`;
            console.log(status);
        
        });
        
       gitinit.on('close', (code) => {
            console.log(`Status:${code}`);
            if(code !== 0) { callback(new Error('git sub module exited with code', code)); return; }
            callback(null);
        });            
}
module.exports = gitInitilize;