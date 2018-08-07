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

import EoirModal from './payloads/EoirModal';
import SargmtiModal from './payloads/SargmtiModal';
import WamiModal from './payloads/WamiModal';
import SigintModal from './payloads/SigintModal';
import EquipmentModal from './payloads/EquipmentModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "react-table/react-table.css";
import ReactTable from 'react-table';
import { NotificationManager, NotificationContainer } from 'react-notifications';

class PayloadsSpecificationComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			filterValue: '',
			filter: [],
			eoirModalOpen:false,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
			tableRowDetailModalOpen: false,
			payload_list_name: [],
			serialVal:'',
      		nameVal:'',
			form : {
				type: 'Test'
			  },
			editId: '0'
			
		}
	}

	onFind(){
		console.log("find");
	}

	eoirModal = () => {
		this.setState({
			eoirModalOpen: !this.state.eoirModalOpen
		});
	}

	sargmtiModal = () => {
		this.setState({
			sargmtiModalOpen: !this.state.sargmtiModalOpen
		});
	}

	wamiModal = () => {
		this.setState({
			wamiModalOpen: !this.state.wamiModalOpen
		});
	}

	sigintModal = () =>{
		this.setState({
			sigintModalOpen: !this.state.sigintModalOpen
		});
	}

	equipmentModal = () => {
		this.setState({
			equipmentModalOpen: !this.state.equipmentModalOpen
		});
	}

	tableRowDetailModal = () => {
		this.notify();
		this.props.fetchPayloads();
		this.props.fetchPayloadList();
		this.setState({
			tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen,
			editId: 0,
		})
	}

	notify =()=>{
		const { translations } = this.props;
			if (this.state.editId !== undefined && this.state.editId !== '0') {
				NotificationManager.success(translations['Update Platform Inventory Message'], translations['Platform Inventory Title'], 5000);
			}else{
				NotificationManager.success(translations['Add Platform Inventory Message'], translations['Platform Inventory Title'], 5000);
			}
	}

	componentWillMount() {
		this.props.fetchPayloads();
		this.props.fetchPayloadList();
	//	this.props.fetchCocoms();
	//	this.props.fetchLocationList();
	}

	openPayloadsSpecificationForm = (row) => {
		console.log(row);
		this.setState({
		    editId: row,
		  	eoirModalOpen:true,
			sargmtiModalOpen: false,
			wamiModalOpen: false,
			sigintModalOpen: false,
			equipmentModalOpen: false,
		});
		console.log(this.state.editId);
	  }

	  handleForm = () => {
		console.log("here");
		this.setState({
		  form: {
			type: 'Air-to-surface'
		  }
		}, () => {
		 // console.log("New state in ASYNC callback:22222", this.state.intelRequest);
		});
	  }

	renderItems(optionItem) {
		let items = [{"label": "-Select Item-", "value": 0}];
		optionItem.map((item, i) => {
			items.push({"label": item.description, "value": i});
		});
		return items.map(function(data, key){
			if(data.label == "-Select Item-"){
			  return ( <option key={key} value=""> {data.label} </option>) ;
			} else {
			  return (<option key={key} value={data.label}>{data.label}</option> );
			}
		})
	}

	handleChange(value) {
		console.log(value);
	}

	render() {
		const {translations} = this.props;
		const {allPayloads, payloadList, payloadTypes, cocomList, locationList} = this.props;

		const addPayloads = [
			{name:translations['eo/ir'], onClick:this.eoirModal},
			{name:translations['sar/gmti'], onClick:this.sargmtiModal},
			{name:translations['wami'], onClick:this.wamiModal},
			{name:translations['sigint'], onClick:this.sigintModal},
			{name:translations['equipment'], onClick:this.equipmentModal},
		];

		const columns = [
			{
				Header: "ID",
				accessor: 'ID',
				// filterMethod: (filter, row) =>
				// 			row[filter.id].startsWith(filter.value),
				// Filter: ({ filter, onChange}) =>
				// 		<select
				// 			onChange={event => onChange(event.target.value)}
				// 			style={{ width: "100%" }}
				// 			value={filter ? filter.value : ""} >
				// 			{this.renderItems([])}
				// 			<option key={'1'} value={'eo/ir'}>{'eo/ir'}</option>
				// 			<option key={'2'} value={'sar/gmti'}>{'sar/gmti'}</option>
				// 			<option key={'3'} value={'wami'}>{'wami'}</option>
				// 			<option key={'4'} value={'sigint'}>{'sigint'}</option>
				// 			<option key={'5'} value={'equipment'}>{'equipment'}</option>
				// 		</select>,
				// sortMethod: (a, b) => {
				// 			  if (a.length === b.length) {
				// 				return a > b ? 1 : -1;
				// 			  }
				// 			  return a.length > b.length ? 1 : -1;
				// 			}// String-based value accessors!
			  },
			{
				Header: "Payload",
				accessor: 'payload',
				// Filter: ({ filter, onChange }) =>
				// 		   <select
				// 			onChange={event => onChange(event.target.value)}
				// 			style={{ width: "100%" }}
				// 			value={filter ? filter.value : ""}
				// 		  >
				// 			{this.renderItems([])}
				// 			{allPayloads.map(function(data, key){
				// 				return (<option key={key} value={data.payload}>{data.payload}</option> );
				// 			})}
				// 		  </select>
			},
			{
				Header: "Nomenclature",
				accessor: 'nomenclature',
			},
			{
				Header: "Manufacturer",
				accessor: 'manufacturer',
				// Filter: ({ filter, onChange }) =>
				// 		  <select
				// 			  onChange={event => onChange(event.target.value)}
				// 			  style={{ width: "100%" }}
				// 			  value={filter ? filter.value : ""}
				// 		  >
				// 			  {this.renderItems(cocomList)}
				// 		  </select>
			},
			{
				Header: "Abbreviation",
				accessor: 'type',
				// Filter: ({ filter, onChange }) =>
				// 		  <select
				// 			  onChange={event => onChange(event.target.value)}
				// 			  style={{ width: "100%" }}
				// 			  value={filter ? filter.value : ""}
				// 		  >
				// 			{this.renderItems([])}
				// 			{allPayloads.map(function(data, key){
				// 				return (<option key={key} value={data.location}>{data.location}</option> );
				// 			})}
				// 		  </select>
			},
			{
			  Header: "Description",
			  accessor: 'typeDescription',
			},
			{
				Header: translations['view'],
				accessor: 'ID',
				filterable: false,
				Cell: row => <span className='number change-cursor-to-pointer'><img src="/assets/img/general/pen_icon.png" onClick={() => this.openPayloadsSpecificationForm(row.value)} /></span> // Custom cell components!
			}
		];

		let serialval = this.state.serialVal;
    	let nameval = this.state.nameVal;

		const rowFields = [
			{name: translations['Type'], type: 'dropdown'},
			{name: translations['Name'], type: 'input', valField:nameval},
			{name: translations['Serial#'], type: 'input', valField:serialval},
			{name: translations['COCOM'], type: 'dropdown'},
			{name: translations['Unit'], type: 'dropdown'},
			{name: translations['Location'], type: 'dropdown'},
			{name: translations['Record Date'], type: 'date'},
		];

		return (
			<div>
				<div className="row orders-assets">
					<div className="header-line">
						<img src="/assets/img/admin/personnel_1.png" alt=""/>
						<div className="header-text">
							Payloads Specification
						</div>
						<img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
					</div>
				<div className="col-md-12 filter-line">
					<div className="add-button">
						<DropDownButton key = '1' label="Add Specification" id="1" items={addPayloads} />
					</div>
				</div>
				{this.state.eoirModalOpen ?
				<EoirModal editId={this.state.editId} show={this.state.eoirModalOpen} onClose={this.eoirModal} translations = {translations}/>
				: null }
				{this.state.sargmtiModalOpen ?
				<SargmtiModal show={this.state.sargmtiModalOpen} onClose={this.sargmtiModal} translations = {translations}/>
				: null }
				{this.state.wamiModalOpen ?
				<WamiModal show={this.state.wamiModalOpen} onClose={this.wamiModal} translations = {translations}/>
				: null }
				{this.state.sigintModalOpen ?
				<SigintModal show={this.state.sigintModalOpen} onClose={this.sigintModal} translations = {translations}/>
				: null }
				{this.state.equipmentModalOpen ? 
				<EquipmentModal show={this.state.equipmentModalOpen} onClose={this.equipmentModal} translations = {translations}/>
				: null }
				<TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations} rowvalues = {this.handleForm} init = {this.state.form}/>
				<NotificationContainer />
				<div className="col-md-12">
					<ReactTable
						data={allPayloads}
						columns={columns}
						defaultPageSize={5}
						className="-striped -highlight"
						filterable={true}
						defaultFilterMethod={(filter, row) => {
							const id = filter.pivotId || filter.id
							return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
						  }}
					/>
				</div>
				</div>


			</div>
		);
	}
}

PayloadsSpecificationComponent.propTypes = {
	children: PropTypes.element,
};

export default PayloadsSpecificationComponent;
