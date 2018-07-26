import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dropdown from "../reusable/Dropdown";
import CustomDatePicker from '../reusable/CustomDatePicker';
import ShortHeaderLine from './ShortHeaderLine';

class ConfigBlock extends React.Component {

  constructor(props) {
    super(props);
  }

  renderFields() {
    let j = this.props.block;
    return this.props.fields.map((item, i) => {
      return (
        <div className=" col-md-12 check-list" key={i}>
          <div className="check-box">
            <input type="checkbox" id={`checkbox${i}${j}`} name={`checkbox${i}${j}`}/>
            <label htmlFor={`checkbox${i}${j}`}><span /></label>
          </div>
          <div className="check-label">
            {item.name}
          </div>
        </div>
      )
    });
  }

  render() {

    return (
      <div className="check-block">
        <div className="col-md-12">
          <div className="header-line">
            <img src="/images/message/headerline1.png" alt=""/>
            <div className="header-text">
              {this.props.subHeaderText}
            </div>
            <img className="mirrored-X-image" src="/images/message/headerline1.png" alt=""/>
          </div>
        </div>
        <div className="col-md-12">
          <div className="check-status">
            {this.renderFields()}
          </div>
        </div>
      </div>
    );
  }
}

ConfigBlock.propTypes = {
  children: PropTypes.element,

};

export default ConfigBlock;
