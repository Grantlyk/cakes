import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class Cakes extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired,
      staticContext: PropTypes.object,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      comment: '',
      yumFactor: '',
      // I added an imageUrl input, the document didn't say it was necessary
      // but I think it is as the API returns an error when one isn't present
      imageUrl: '',
      errors: [],
    };

    this.createCake = this.createCake.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  async createCake(event) {
    event.preventDefault();
    this.setState({ errors: [] });

    const response = await fetch(
      'http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000/api/cakes',
      {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      },
    );

    if (response.ok) {
      this.context.router.history.push('/');
    } else {
      const message = await response.json();
      // A Polyfill should be added for IE
      // as Object.values isn't supported in IE
      const errors = Object.values(message).flat();
      this.setState({ errors });
    }
  }

  render() {
    return (
      <form noValidate autoComplete="off" style={{ padding: '70px' }}>
        <h1>Create a new Cake</h1>
        <TextField
          label="Name"
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Comment"
          value={this.state.comment}
          onChange={this.handleChange('comment')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="ImageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange('imageUrl')}
          margin="normal"
          variant="outlined"
        />
        <br />
        <FormControl variant="filled" style={{ margin: '15px 0 15px' }}>
          <InputLabel>Yum</InputLabel>
          <Select
            value={this.state.yumFactor}
            onChange={this.handleChange('yumFactor')}
            input={<FilledInput name="yumFactor" />}
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button
          style={{ float: 'right' }}
          variant="contained"
          onClick={this.createCake}
        >
          Submit
        </Button>
        <br />
        {this.state.errors &&
          this.state.errors.map((error, i) => (
            <div key={i} style={{ margin: '10px' }}>
              <span style={{ color: 'red' }}>{error}</span>
              <br />
            </div>
          ))}
      </form>
    );
  }
}

export default Cakes;
