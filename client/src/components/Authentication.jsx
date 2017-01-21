import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {IndexLink} from 'react-router';
import ziggurate from '../../images/ziggurate.png'
import Paper from 'material-ui/Paper';
import request from 'superagent';

const style = {
  margin: 12,
};

export default class Authentication extends Component {

state={
    githubUrl: ''
  };

  componentDidMount () {
    request.get('http://localhost:9080/api/v1/auth/github/login')
           .set('Accept', 'application/json')
          .end((err, res) => {
              this.setState({githubUrl: res.text});
          });
   }

  render() {
    return(



    	
      <div style={{marginLeft:'0%',marginTop:'8%',textAlign:'center'}}>
     
      <img src= {ziggurate} style={{postion:'fixed',margin:'auto',width:400,height:'auto'}}/>
      <div className='row center-xs'>
        <h1 >Ziggurate</h1>
      <a href= {this.state.githubUrl}> 
      <RaisedButton
      style={{height: '50', width:400,marginTop:'2%'}}
      label="Login with GitHub" type="submit" primary={true} />
       </a>
      
      </div>
     
      </div>
     


   );

    }
}

