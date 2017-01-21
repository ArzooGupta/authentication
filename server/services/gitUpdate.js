var status;
var gitUpdate=function(repoPath, callback) {
        const spawn=require('child_process').spawn;
        //ls -lh /usr
        // var res = repoName.split("/");
        // res=res[res.length-1];
        // const parent=spawn('pwd',{cwd: path});
        const gitupdate=spawn('git', ['submodule','update'],{cwd:repoPath});
 
        gitupdate.stderr.on('data', (data)=> {
             status=`${data}`;
             console.log(status);
    
        });

        gitupdate.stdout.on('data', (data)=> {
            status=`${data}`;
            console.log(status);
        
        });
        
        gitupdate.on('close', (code) => {
            console.log(`Status:${code}`);
            if(code !== 0) { callback(new Error('git update exited with code', code)); return; }
            callback(null);
        });            
}
module.exports = gitUpdate;