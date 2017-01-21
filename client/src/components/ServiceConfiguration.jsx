import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import RedisPart from './RedisPart';
import MongoPart from './MongoPart';
import Todo from './Popover';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Autoscaling from './AutoScaling';
import Dialog from 'material-ui/Dialog';
import CustomGrid from './CustomGrid';
import ConfigureService from './CustomGrid'

const style = {style1:{
 height: 350,
 width: 500,
 marginTop: 30,
 marginLeft:400,
 align: 'center',
 display: 'inline-block',

},
style2:{
  position:"fixed",
  bottom:50,
  right:150,
},
style3:{
 marginLeft:20,
 marginTop:10
}, 
domain: {
  fontWeight: 'bold',
}
};

export default class ServiceConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceNames: [],
      services: [],
      dialogOpen: []
    };
  }
  
  static get propTypes() {
    return {
      valueOfService: React.PropTypes.object.isRequired,
      onSubmit: React.PropTypes.func.isRequired
    }
  }

 handleNext = () => {
  const {stepIndex} = this.state;
  this.setState({
    stepIndex: stepIndex + 1,
    finished: stepIndex >= 2,
  });
};
handlePrev = () => {
  const {stepIndex} = this.state;
  if (stepIndex > 0) {
    this.setState({stepIndex: stepIndex - 1});
  }
};
handleTouchTap = (k, event) => {
    // This prevents ghost click.
    event.preventDefault();
     const dialogOpen = this.state.dialogOpen;
     dialogOpen.splice(k, 1, true);
     this.setState({dialogOpen: dialogOpen});
  };

  handleRequestClose = () => {
    this.setState({
      //open: false,
    });
  };
   handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    //this.setState({open: false});
    var  dialogOpen = this.state.dialogOpen.map(() => { return false; });
    this.setState({dialogOpen: dialogOpen});
  };
  componentDidMount() {
    this.setState({valueService: this.props.valueOfService})
   // console.log(this.state.valueService.service);
  }
 //}

componentWillMount() {
    this.decomposeValue();
    // console.log("print"+this.state.services.name[1]);
  }
 decomposeValue() {
  const value = this.props.valueOfService;
  console.log('value:', value);
  const serviceNames = Object.keys(value.services);
  const services = serviceNames.map((serviceName) => {
    return value.services[serviceName];
  });
  const dialogOpen = services.map(() => {
    return false;
  });
  this.setState({serviceNames: serviceNames, services: services, dialogOpen: dialogOpen});
}
objectProperty(){
  console.log('this.state.jsonfile',this.state.jsonfile);
var a= []
    for(var i in this.state.jsonfile){
       a[i] =this.state.jsonfile[i].environment;
       console.log("sdg", a[i]);
    }
}


onChange1(index, newService) {
  console.log('newService:', newService);
  const services = this.state.services;
  services.splice(index, 1, newService);
  var  dialogOpen = this.state.dialogOpen.map(() => { return false; });
  this.setState({services: services, dialogOpen: dialogOpen});
}


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
     
    ];

    console.log('services', this.state.services);

    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    console.log('serviceNames:', this.state.serviceNames);
  let services1= this.state.serviceNames.map((serviceName, i)=> {
     return(
         <GridList
      cellHeight={62} 
      >
  
      <GridTile key={i} style={{paddingTop:20}}>

      <RaisedButton style={{width:300}}
      onTouchTap={this.handleTouchTap.bind(this, i)}
      label={serviceName}
      />
       <Dialog
          actions={actions}
          modal={true}
          open={this.state.dialogOpen[i]}
          style={{width:800, marginLeft:350}}
        >
      <h1> {serviceName} </h1>
       <div>
          <Menu >
            <MenuItem>
             <ConfigureService value={this.state.services[i]} name={this.state.serviceNames[i]} onChange={this.onChange1.bind(this, i)} />  
            </MenuItem>
          </Menu>
          </div>
        </Dialog>
      </GridTile>
      </GridList>
     
      )
   }
   );
    return(
      <div>
          <div>
        <form  onSubmit={this.handleServicesConfigured.bind(this,this.state.valueService)}>
      <div >
      <div style={{marginTop:0}}>
      <h2 style={{textAlign:"center"}}>Configure Microservices</h2>
      <div style={{}}>
      {services1}
      </div>

      </div>
      <RaisedButton label="Next" primary={true} style={{margin:12}} type= 'submit' />

      </div>
      </form>
      </div>
  </div>
  );

  }
  
  handleServicesConfigured(valueService)
  { 
    console.log(valueService);
    this.props.onSubmit(valueService);
  }

ArrayOfServices(valueService){
    var a= [];
    var j=0;
    //console.log(valueService.services.service.environment);
  for(var i in valueService.services){
     a[j] =i
   // console.log("service page"+a[j]);
    j++;
  }
  return a;
  }
  ArrayOfEnvironment(valueService){
    var a= []
    for(var i in valueService.services){
       a[i] =valueService.services[i].environment;
     //  console.log("sdg"+Object.keys(a[i])+":"+Object.values(a[i]));
    }
    return a;
  }
}
  
 