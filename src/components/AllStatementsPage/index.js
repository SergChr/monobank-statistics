import React, { PureComponent } from 'react';

import { getStatements } from '../../utils/helpers';

export default class AllStatements extends PureComponent {
  state = {
    data: [],
  }

  async componentDidMount () {
    const data = await getStatements();
    this.setState({ data });
  }

  render () {
    const { data } = this.state;

    return null;
  }
}
