import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import CircularProgressbar from 'react-circular-progressbar';
import Request from 'superagent'



export default class RepositoryDetails extends React.Component {
  static get propTypes() {
    return {
      onSubmit: React.PropTypes.func.isRequired
    }
  }
constructor() {
  super();
  this.selectBranch=this.selectBranch.bind(this);
   this.state = {
    repository:[{}],
    branches:[],
    isButtonDisabled: true,
    selectedRepository:''
    

  };
  
}
componentDidMount() {

  Request
       .get("https://api.github.com/users/ebin011/repos")
       .then((res) => {
        this.setState({
           repository: res.body,
           
         });
       });
    }
       

 

  handleChangeRepo = (event, index, value) => {
      
  this.setState({selectedRepository:value,selectedBranch:null});
          {this.selectBranch()} 
       };


     selectBranch=()=>{
        var reponame=this.state.selectedRepository;
        console.log("dufudf");
        console.log({reponame});
        Request
       .get("https://api.github.com/repos/ebin011/"+{reponame}+"/branches")
       .then((res) => {
        this.setState({
          branches: res.body,
          
         });
      });
       }
  
  handleChangeBranch=(event, index, value) => {
 
    
    this.setState({selectedBranch:value,isButtonDisabled: false});

}
    
  
  render() {
    console.log(this.state.selectedRepository);
      const repoName=this.state.repository.map((repo) => {

        return (
          <MenuItem key={repo.name} value={repo.name} primaryText={repo.name}/>
          );

      });

      const branchName=this.state.branches.map((branch) => {

        return (
          <MenuItem key={branch.name} value={branch.name} primaryText={branch.name}/>
          );

      });

    return (
      <div>
      <form onSubmit={this.handleRepositorySelected.bind(this, this.state.selectedRepository,this.state.selectedBranch) }>
      <div style={{marginTop:20}}>
      <h2 style={{textAlign:"center"}}>Choose Repository and Branch</h2>
      <div style={{}}>
      
       <SelectField
          floatingLabelText="Select Repositary"
          value={this.state.selectedRepository}
           onChange={this.handleChangeRepo}
          >
        {repoName}
        </SelectField>
       <br/>
       <SelectField
          floatingLabelText="Select Branch"
          value={this.state.selectedBranch}
          disabled={!this.state.selectedRepository }
           onChange={this.handleChangeBranch}
            >
         {branchName}
          
        </SelectField>
       <br/>
     </div>
       
       </div>
        <RaisedButton label="Next" primary={true}
        disabled={ this.state.isButtonDisabled}
        type= 'submit'
                />
       
        
    </form>
   </div> 
    );
  }
  handleRepositorySelected(repo,branch)
  {
    this.setState({
      isButtonDisabled:true,
      
    });
    
    
    this.props.onSubmit(repo,branch);
    console.log(this.state.isButtonDisabled);
     
    
  }
}
