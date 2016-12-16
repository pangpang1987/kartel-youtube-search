import React, {
  Component
} from 'react';
import Header from '../../components/Header';
import './CoreLayout.scss';
import '../../styles/core.scss';

class CoreLayout extends Component {

  static propTypes = {
    children : React.PropTypes.element.isRequired
  }

  render() {
    return (
      <div>
        <Header />
        <div className='core-layout__viewport'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CoreLayout;
