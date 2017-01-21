var status;
const async = require('async');
const gitInitilize=require('./gitInitilize');
const gitUpdate=require('./gitUpdate');
var gitMod=function(repoPath, callback) {
        const spawn=require('child_process').spawn;
        //ls -lh /usr
        // var res = repoName.split("/");
        // res=res[res.length-1];
        // const parent=spawn('pwd',{cwd: path});
        const gitmodule=spawn('find', ['-name', '.gitmodules'],{cwd:repoPath});
 
        gitmodule.stderr.on('data', (data)=> {
             status=`${data}`;
             console.log(status);
    
        });

        gitmodule.stdout.on('data', (data)=> {
            status=`${data}`;
            console.log(status);
        
        });
        
        gitmodule.on('close', (code) => {
            console.log(`Status:${code}`);
            if(code !== 0) { callback(new Error('git clone exited with code', code)); return; }
           // callback(null,status);
           else if(status!=='undefined')
           {
                    async.series([
                            gitInitilize.bind(null,repoPath),
                            gitUpdate.bind(null,repoPath)
                                    ], 
                            function (err, result) {
                                   // result now equals 'done'   
                                if(err) { console.error('Deploy Failed with error', err); return; }
                                      console.log('cloned submodules');
                                      callback(null); 
                             });
                   
           }
           else
           {
                    callback(null);
           }

        });            
}
module.exports = gitMod;