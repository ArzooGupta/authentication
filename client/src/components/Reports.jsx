import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class Reports extends React.Component
{


render() {

const style1 = {
 height: 400,
 width: 500,
marginTop: 30,
 marginLeft:400,
 textAlign: 'left',
 display: 'inline-block',
  
 };


    return(
    
     <div>
     
  <Paper style={style1} zDepth={1}  >
  <h1 style = {{textAlign: 'center', margin: 0}}> Reports</h1>
<Divider/>
<h3 style = {{textAlign: 'left', margin: 10}}>Service: </h3>
<h3 style = {{textAlign: 'left', margin: 10}}>Result:</h3>
<h3 style = {{textAlign: 'left', margin: 10}}>Code:</h3>
 
  </Paper>
  </div>
      );
  }
}

export default Reports;





