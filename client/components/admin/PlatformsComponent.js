import PropTypes from 'prop-types';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import AddPlatformInventory from './platform/AddPlatformInventory';
import {NoticeType, TableDefaults} from '../../dictionary/constants';
import { defaultFilter } from '../../util/helpers';





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

  componentDidMount() {
    this.props.fetchPlatformInventory();
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

  closePlatformForm = (actionType) => {
    this.loadData(actionType);
    this.setState({
      editId: 0,
      addPlatformInventoryOpen: false,
    });
  }

  loadData = (actionType) => {
	  this.notify(actionType);
	  this.props.fetchPlatformInventory();
  }

	deletePayloadInventory = (value) => {
	  if (value !== undefined && value !== '0') {
	    this.props.deletePlatformInventoryById(value).then(() => {
	      //this.setState({ editId: '0' });
	      this.notify(NoticeType.DELETE);
	      this.props.fetchPlatformInventory();
	    });
	  }
	}

  notify =(actionType)=>{
    const { translations } = this.props;
    if (NoticeType.DELETE != actionType) {
      if (this.state.editId !== undefined && this.state.editId !== '0') {
        NotificationManager.success(translations['UpdatedSuccesfully'], translations['Platform Inventory Title'], 5000);
      }else{
        NotificationManager.success(translations['AddedSuccesfully'], translations['Platform Inventory Title'], 5000);
      }
    }else{
      NotificationManager.success(translations['DeletedSuccesfully'],translations['Platform Specification Title'], 5000);
    }
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
    const { allPlatformInventory } = this.props;

    const columns = [

      {
        Header: translations["Tail#"],
        accessor: 'tailNbr',
        // filterMethod: (filter, row) =>
        //   row[filter.id].startsWith(filter.value),

        // sortMethod: (a, b) => {
        //   if (a.length === b.length) {
        //     return a > b ? 1 : -1;
        //   }
        //   return a.length > b.length ? 1 : -1;
        // }// String-based value accessors!
      },
      {
        Header: translations['Manufacturer'],
        accessor: 'manufacturer',
      },
      {
        Header: translations['Platform Name'],
        accessor: 'name',
      },
      {
        Header: translations['Category'],
        accessor: 'category',
        
      },
      {
        Header: translations['Branch'],
        accessor: 'branchOfService'
      },
      {
        Header: translations['COCOM'],
        accessor: 'COCOM'
      },
      {
        Header: translations['Owning Unit'],
        accessor: 'owningUnit'
      },
      {
        Header: translations['Location'],
        accessor: 'location'
      },
      {
        Header: translations['view'],
        accessor: 'id',
        filterable: false,
        Cell: row => <div><a href="#" className="btn btn-primary" onClick={() => this.openPlatformForm(row.value)} title="Edit" ><span className="glyphicon glyphicon-edit"/></a>&nbsp; 
              {this.state.editId == row.value ? <a href="javaScript:void('0');" className="btn btn-danger action-not-allow" title="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a> :
              <a href="javaScript:void('0');" onClick={() => this.deletePayloadInventory(row.value)} className="btn btn-danger" title="Delete"> <span className="glyphicon glyphicon-trash"/></a>}
        </div>,

      }
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
            <AddPlatformInventory editId = {this.state.editId} onClose={this.closePlatformForm} translations={translations} />
            : null}

          
          
          <div className="col-md-12">
            <ReactTable
              data={allPlatformInventory}
              columns={columns}
              className="-striped -highlight"              
              filterable={true}
              defaultPageSize={TableDefaults.PAGE_SIZE}
						  minRows={TableDefaults.PAGE_SIZE}
              loading={this.props.isLoading}
						  defaultFilterMethod={defaultFilter}
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
