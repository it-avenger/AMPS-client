import { uploadFile } from 'actions/file';
import { addMunitionInventory, fetchMunitionInventoryById, updateMunitionInventory } from 'actions/munitionsinventory';
import axios from 'axios';
import { baseUrl } from 'dictionary/network';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";





class AddMunitionsInventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      clear: false,
      editFetched: false,
      locationCatg: '',
      imagePreviewUrl: '',
      locationUpdate: true,
      oneMunitionInventory: {},
      // munition: {
      //   metaDataID: '',
      //   locationID: '',
      //   owningUnit: '',
      //   serialNumber: '',
      //   updatelocation: false
      // }
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  /**
   * Auto invoked functions and Once initialized.
   */
  componentDidMount = () => {
    let { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.props.fetchMunitionInventoryById(editId).then(() => {
        this.setState(
          {
            editFetched: true,
            munition: this.props.onePayloadInventory ,
          });
      });
    }
  }

  /**
   * Auto invoked functions. This Function works like as listener. This will update or call during changes in the value of input fields.
   */
  componentDidUpdate = (prevProps, prevState) => {
    let { editId } = this.props;
    if (editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchMunitionInventoryById(editId).then(() => {
        this.setState(
          {
            editFetched: true,
            munition: this.props.onePayloadInventory,
          });
      });
    }

    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }
  }

  stopupd = () => {
    this.setState({ editFetched: false });
  }

  handleMunitionGeneralData = (generalData) => {
    const { munition } = this.state;
    this.setState({ locationCatg: generalData.locationCatg });
    this.setState({
      munition: {
        metaDataID: generalData.metaDataID,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,
        COCOM: generalData.COCOM,
        branch: generalData.branch,
        serialNumber: generalData.serialNumber,
        lastUpdateUserId: '000',
        lastUpdate: new Date(),
      }
    }, () => {
      console.log('New state in ASYNC callback:22222', this.state.munition);
    });


    if (generalData.locationCatg && generalData.locationCatg != this.state.locationCatg) {

      console.log("Category Selected");
      this.updatelocationid(generalData);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { editId } = this.props;
    let { munition } = this.state;
    if (editId !== undefined && editId !== '0') {
      munition.id = editId;
      this.props.updateMunitionInventory(editId, munition).then(() => { this.props.onClose(); });
    } else {
      this.props.addMunitionInventory(munition).then(() => { this.props.onClose(); });
    }
  }

  updatelocationid(generalData) {
    let locationselect = document.getElementsByName('locationID')[0];
    let items = [{ 'label': '--Select Item--', 'value': '' }];
    const apiUrl = `${baseUrl}/Locations/GetLocationsByCategory?Category=` + generalData.locationCatg;
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        if (items.length > 1) { items.length = 0; items = [{ 'label': '--Select Item--', 'value': '' }]; }
        response.data.map(item => {
          items.push({ 'label': item['description'], 'value': item['id'].trim() });
        });
        if (locationselect.length > 0) { locationselect.length = 0; }
        for (let i in items) {
           let selected = false;
            if( items[i].value === generalData.locationID) {
              selected = true;
            }
          locationselect.add(new Option(items[i].label, items[i].value, selected, selected));
        }
      })
      .catch((error) => {
        console.log('Exception comes:' + error);
      });
  }

  stopset() {
    this.setState({ clear: false });
  }

  resetForm() {
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      this.setState({ clear: true });
    }
    else {

    }
  }

  render() {
    // Render nothing if the "show" prop is false
    // if(!this.props.show) {
    //   return null;
    // }

    const { translations } = this.props;

    let { locationCatg } = this.state;

    let { munition } = this.state;

    debugger;

    let generalFields = [
      { name: "Munitions Specifications", type: 'dropdown', ddID: 'Munition/GetMunitions', domID: 'metaDataID', valFieldID: 'metaDataID', required: true },
      { name: "Serial #", type: 'input', domID: 'serialNumber', valFieldID: 'serialNumber', required: true },
      { name: "COCOM", type: 'dropdown', domID: 'COCOM', ddID: 'COCOM', valFieldID: 'COCOM',  required: true},
      { name: translations['Branch'], type: 'dropdown', domID: 'branch', ddID: "BranchOfService", valFieldID: 'branch',  required: true },
      { name: "Owning Unit", type: 'dropdown', domID: 'owningUnit', ddID: 'Units/GetUnits', valFieldID: 'owningUnit' , required: true },
      { name: 'Location Category', type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationCatg', required: true },
      { name: 'Location ID', type: 'dropdown', domID: 'locationID', ddID: '', valFieldID: 'locationID', required: true },
      /*       {name: "Location Category", type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory'},
    
      {name: "Type", type: 'dropdown', domID: 'typeId', ddID: 'MunitionRoles/GetMunitionRoles', valFieldID: 'type'}, */
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >
        {/* <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div> */}
        <div className="payload-content">
          <div className="row personnel" >

            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                Add Munitions Inventory
                </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div>
          </div>

          <div className="row personnel" >

            <div className="under-munitions-content">
              <div className="col-md-4"></div>
              <ContentBlock fields={generalFields} editId={this.props.editId} data={this.handleMunitionGeneralData} initstate={this.props.oneMunitionInventory} clearit={this.state.clear} stopset={this.stopset.bind(this)}
                editFetched={this.state.editFetched} stopupd={this.stopupd} />
            </div>
          </div>
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="button" className='highlighted-button' onClick={this.resetForm.bind(this)}>
              {translations['clear']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="submit" className='highlighted-button'>
            {/* {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']} */}
            {translations['submit']}

            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

AddMunitionsInventory.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneMunitionInventory: state.munitionsinventory.oneMunitionInventory,
  };
};

const mapDispatchToProps = {
  addMunitionInventory,
  updateMunitionInventory,
  fetchMunitionInventoryById,
  uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMunitionsInventory);
