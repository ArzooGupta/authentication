var status;
var gitMod =require('./gitModule');
const gitInitilize=require('./gitInitilize');
const gitUpdate=require('./gitUpdate');

var checkOut=function(repoName,branchName,callback) {
        const spawn=require('child_process').spawn;
        //ls -lh /usr
        //const repository = 'akanksha152/tasker';
        //const repoName = repository.split('/')[1];
        const checkOut1=spawn('git', ['checkout', branchName],{cwd:repoName});
 
        checkOut1.stderr.on('data', (data)=> {
             status=`${data}`;
             console.log(status);
    
        });

        checkOut1.stdout.on('data', (data)=> {
            status="Sucess";
        
        });
        
        checkOut1.on('close', (code) => {
            console.log(`Status:${code}`);
            if(code !== 0) { callback(new Error('git clone exited with code', code)); return; }
            //callback(null);
            // var module=gitMod(repoName, (err, dir) => {
            //         if(err){console.log(err)}
            //         else{ var dir1= dir;
            //             console.log(dir);}
            //         });
            // console.log(module);
            // if(module=='undefined')
            // {
            //     callback(null);
            // }
            // else
            // {
            //     var init=gitInitilize(repoName,(err,dir)=>{});
            //     var update=gitUpdate(repoName,(err,dir)=>{});
            //     callback(null);
            // }
            callback(null);
        });            
}
module.exports = checkOut;