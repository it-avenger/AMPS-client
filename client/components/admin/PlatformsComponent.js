import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UploadBlock from "../reusable/UploadBlock";
import ContentBlock from "../reusable/ContentBlock";
import ButtonsList from "../reusable/ButtonsList";
import FilterDropdown from '../reusable/FilterDropdown';
import Dropdown from '../reusable/Dropdown';
import FilterDatePicker from '../reusable/FilterDatePicker';
import DropDownButton from '../reusable/DropDownButton';
import StatusTable from '../reusable/StatusTable';

import AddPlatformInventory from './platform/AddPlatformInventory';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "react-table/react-table.css";
import ReactTable from 'react-table';


class PlatformComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPlatformInventoryOpen: false,
      tableRowDetailModalOpen: false,
      addshow: false,
      editId: '0',
    }
  }

  onFind() {
    console.log("find");
  }

  addPlatformInventory = () => {
    this.setState({
      addPlatformInventoryOpen: !this.state.addPlatformInventoryOpen,
    });
  }

  openPlatformForm = (row) => {
    this.setState({
      editId: row,
      addPlatformInventoryOpen: true,
    });
  }

  closePlatformForm = () => {
    this.setState({
      editId: 0,
      addPlatformInventoryOpen: false,
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen,
    })
  }


  componentDidMount() {

    this.props.fetchPlatforms();
    debugger;
  }

  // renderItems(optionItem) {
  //   let items = [{"label": "-Select Item-", "value": 0}];
  //   optionItem.map((item, i) => {
  //       items.push({"label": item.description, "value": i});
  //   });
  //   return items.map(function(data, key){
  //       if(data.label == "-Select Item-"){
  //         return ( <option key={key} value=""> {data.label} </option>) ;
  //       } else {
  //         return (<option key={key} value={data.label}>{data.label}</option> );
  //       }
  //   })
  // }

  handleChange(value) {
    console.log(value);
  }

  render() {

    const { translations } = this.props;
    const { allPlatforms } = this.props;

    console.log(allPlatforms);
    debugger;
    const columns = [

      {
        Header: translations["Tail#"],
        accessor: 'tail',
        filterMethod: (filter, row) =>
          row[filter.id].startsWith(filter.value),

        sortMethod: (a, b) => {
          if (a.length === b.length) {
            return a > b ? 1 : -1;
          }
          return a.length > b.length ? 1 : -1;
        }// String-based value accessors!
      },
      {
        Header: translations['Platform Name'],
        accessor: 'platform',
        filterMethod: (filter, row) =>
          row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['Category'],
        accessor: 'category',
        filterMethod: (filter, row) =>
          row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['Service'],
        accessor: 'branchOfService'
      },
      {
        Header: translations['Location'],
        accessor: 'location'
      },
      {
        Header: translations['view'],
        accessor: 'ID',
        filterable: false,
        Cell: row => <span className='number'><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPlatformForm(row.value)} /></span>// Custom cell components!
      }
    ];

    const rowFields = [
      { name: translations['Tail#'], type: 'input', valField: 'aaa' },
      { name: translations['Platform Name'], type: 'input' },
      { name: translations['Category'], type: 'input' },
      { name: translations['Service'], type: 'input' },
      { name: translations['Owning Unit'], type: 'input' },
      { name: translations['Location'], type: 'dropdown' },
      { name: translations['Record Date'], type: 'date' },
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
              {translations["platform"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <button className="ccir-button" onClick={() => this.openPlatformForm('0')} >{translations["Add Platform"]}</button>
            </div>
          </div>
          {this.state.addPlatformInventoryOpen ?
            <AddPlatformInventory editId = {this.state.editId} show={this.state.addPlatformInventoryOpen} onClose={this.closePlatformForm} translations={translations} />
            : null}
          <div className="col-md-12">
            <ReactTable
              data={allPlatforms}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            />
          </div>
        </div>

        {/* <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/> */}
      </div>
    );
  }
}

PlatformComponent.propTypes = {
  children: PropTypes.element,

};

export default PlatformComponent;
