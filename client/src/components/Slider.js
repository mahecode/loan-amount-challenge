import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import axios from 'axios';

const styles = {
  root: {
    width: "50%",
    position: 'fixed',
    top: '50%',
    left: '25%',
  },
};

class SimpleSlider extends React.Component {
  state = {
    value: 500,
    duration: 6,
    interestRate: '',
    amount: 0,
    numPayments: '',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleMonth = (e , value) => {
      this.setState({duration: value});
  }

  handleDragEnd = (e,value)=>{
      let amount = this.state.value;
      let duration = this.state.duration
      let url = `https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${duration}`;
      axios.get(url)
            .then( res => {
                this.setState({
                    interestRate: res.data.interestRate,
                    amount: res.data.monthlyPayment['amount'],
                    numPayments: res.data.numPayments
                });
            })
            .catch( e => {
                console.log(e);
            })
  }
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const {duration} = this.state;

    return (
    <div>
        <br />
    <Typography align="center" variant="h4">Monthly Payment: ${this.state.amount}</Typography>
    <Typography align="center" variant="h4">Interest rate: {this.state.interestRate}</Typography>
    <Typography align="center" variant="h4">Duration: {this.state.numPayments} months</Typography>
      <div className={classes.root}>
        <Typography align="center" variant="h3">${this.state.value}</Typography>
        <br /><br />
        <Slider
          value={value}
          min={500}
          max={5000}
          aria-labelledby="label"
          onChange={this.handleChange}
        />
        <br /><br /><br />
        <Typography align="center" variant="h6">Loan Duration</Typography>
        <Typography align="center" variant="h3">{this.state.duration} months</Typography>
        <br /><br />
        <Slider
            value={duration}
            min={6}
            max={24}
            onChange={this.handleMonth}
            onDragEnd={this.handleDragEnd}
            step={1}
            />
      </div>
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);