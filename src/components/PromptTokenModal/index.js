import React, { PureComponent } from 'react';
import { Modal, Input } from 'antd';

import { Config } from '../../utils/db';

export default class PromptTokenModal extends PureComponent {
  state = {
    input: null,
    isModalVisible: false,
  }

  async componentDidMount () {
    const token = await Config.get('token');
    if (!token) {
      this.setState({ isModalVisible: true });
    }
  }

  hideModal = () => this.setState({ isModalVisible: false });

  render () {
    const { input, isModalVisible } = this.state;

    return (
      <Modal
        title="Enter Monobank token"
        visible={isModalVisible}
        onOk={async () => await Config.set('token', input) && document.location.reload(true)}
        onCancel={this.hideModal}
      >
        <Input
          onChange={e => this.setState({ input: e.target.value })}
          placeholder="A1rZxmH-bT89lnzGuCOHekxA2V6ebKo8MnClikT3mPhI"
        />
      </Modal>
    )
  }
}
