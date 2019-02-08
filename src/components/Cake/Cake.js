import React, { Component } from 'react';

class Cakes extends Component {
  constructor(props) {
    super(props);

    this.state = { cake: {} };
  }

  componentDidMount() {
    this.getCake();
  }

  async getCake() {
    const response = await fetch(
      `http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000/api/cakes/${
        this.props.match.params.id
      }`,
    );
    const cake = await response.json();
    this.setState({ cake });
  }

  render() {
    const cake = this.state.cake;
    return (
      <div key={cake.id} style={{ padding: '10px', marginTop: '80px' }}>
        <span>{cake.name}</span>
        <br />
        <span>{cake.imageUrl}</span>
        <br />
        <span>{cake.yumFactor}</span>
        <br />
        <span>{cake.comment}</span>
      </div>
    );
  }
}

export default Cakes;
