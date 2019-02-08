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
      // I added a default imageUrl, the document didn't say it was necessary
      // but I think it is as the API returns an error when one isn't present
      imageUrl: 'https://someRandomCakeImg.com/img/img.jpeg',
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
    const response = await fetch(
      'http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000/api/cakes',
      {
        method: 'post',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      },
    );
    console.log(
      'create cake!: ',
      this.state,
      response,
      JSON.stringify(this.state),
    );

    if (response.ok) {
      this.context.router.history.push('/');
    }

    // const message = response.json();
  }

  render() {
    return (
      <form noValidate autoComplete="off">
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
        <FormControl variant="filled" style={{ margin: '10px' }}>
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
        <Button variant="contained" onClick={this.createCake}>
          Submit
        </Button>
      </form>
    );
  }
}

export default Cakes;
