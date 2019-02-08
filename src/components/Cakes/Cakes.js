import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';

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

    this.state = { cakes: [] };
  }

  componentDidMount() {
    this.getCakes();
  }

  async getCakes() {
    const response = await fetch(
      'http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000/api/cakes',
    );
    const cakes = await response.json();
    this.setState({ cakes });
  }

  render() {
    return (
      this.state.cakes &&
      this.state.cakes.map(cake => (
        <Card key={cake.id} raised>
          <ButtonBase
            onClick={() => {
              this.context.router.history.push(`/cake/${cake.id}`);
            }}
          >
            <span>{cake.name}</span>
            <br />
            <span>{cake.imageUrl}</span>
            <br />
          </ButtonBase>
        </Card>
      ))
    );
  }
}

export default Cakes;
