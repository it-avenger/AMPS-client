import React from 'react';
import PropTypes from 'prop-types';
import ContentBlock from '../../reusable/ContentBlock';
import { connect } from 'react-redux';
import { addCcirPir, updateCcirPir, fetchCcirPirById } from 'actions/ccirpir';
import {NoticeType} from '../../../dictionary/constants';
import Loader from '../../reusable/Loader';

class CcirPirModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addClicked: false,
      editFetched:false,
      //  ccirpir:{
      //   COCOMId:'',
      //   BranchId:'',
      //   CountryId:'',
      //   RegionId:'',
      //   UnitId:'',
      //   CommanderId:'',
      //   Type:'',
      //   MissionName:'',
      //   EffectiveAreaKML:''

      //  },
      ccirpir:{},
      EffectiveAreaKML: null,
      oneCcirPir: {},
      loading:false
    };

  }

  componentDidMount() {
    const { editId } = this.props;
    this.setState({ clear: true });
    if(editId !== '0') {
      this.props.fetchCcirPirById(editId).then(() => {
        this.setState(
          { 
            editFetched:true,
            ccirpir: this.props.oneCcirPir,
          });

      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    let { editId } = this.props;
    
    if(editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchPersonnelById(editId).then(() => {
        this.setState(
          {
            editFetched:true,
            ccirpir: this.props.oneCcirPir,
          });
      });
    }
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }
  }

  stopupd = () => {
    this.setState({editFetched:false});
  }

  handleCcirPirGeneralData = (generalData) => {
    const { ccirpir } = this.state;
    this.setState({
      EffectiveAreaKML : generalData.EffectiveAreaKML,
      ccirpir: {
        ...ccirpir,
        COCOMId: generalData.COCOMId,
        BranchId: generalData.BranchId,
        CountryId: generalData.CountryId,
        RegionId: generalData.RegionId,
        UnitId: generalData.UnitId,
        CommanderId: generalData.CommanderId,
        /* Type: generalData.Type,*/
        MissionName: generalData.MissionName,
        /* EffectiveAreaKML: generalData.EffectiveAreaKML, */
        CCIRPIRId: this.props.editId,
      },
    });
  }

handleCcirData = (ccirData) => {
  const { ccirpir } = this.state;
  this.setState({
    ccirpir: {
      ...ccirpir,
      Description1: ccirData.Description1,
      Description2: ccirData.Description2,
      Description3: ccirData.Description3,
      Description4: ccirData.Description4,
    },
  });
}

handlePirData = (pirData) => {
  const { ccirpir } = this.state;
  this.setState({
    ccirpir: {
      ...ccirpir,
      Description5: pirData.Description5,
      Description6: pirData.Description6,
      Description7: pirData.Description7,
      Description8: pirData.Description8,
    },
  });
}

stopset = () => {
  this.setState({clear:false});
}

resetForm = () => {
  this.setState(this.baseState);
  console.log("FORM RESET DONE");
  if (confirm("Do you want to clear all data from this form?")) {
    this.setState( {clear: true} );
    document.getElementById('personnelform').reset();
  }
}

  handleSubmit = event => {
    event.preventDefault();
    const { editId } = this.props;
    let { ccirpir } = this.state;
    const formData = new FormData();
    const kmlFile = this.state.EffectiveAreaKML;
    if (kmlFile) {
      formData.append('EffectiveAreaKML', kmlFile, kmlFile.name);
    }
    if (editId !== undefined && editId !== '0') {
      // Start Loader
      this.setState({loading:true});
      ccirpir.CCIRPIRId = editId;
      ccirpir.LastUpdateUserId =  null;
      formData.append("ccirpirFormData", JSON.stringify(ccirpir));
      this.props.updateCcirPir(editId, formData).then( () => {
        //Stop Loader
        this.setState({loading:false});
        this.props.onClose(NoticeType.UPDATE);
      });
    } else {
      ccirpir.LastUpdateUserId =  null;
      formData.append("ccirpirFormData", JSON.stringify(ccirpir));
      // Start Loader
      this.setState({loading:true});
      this.props.addCcirPir(formData).then( () => {
        // Stop Loader
        this.setState({loading:false});
        this.props.onClose(NoticeType.ADD);
      });
    }
    
  }

  render() {
    // Render nothing if the "show" prop is false
    // if(!this.props.show) {
    //   return null;
    // }

    // let $newdiv = '';

    // if(this.state.addClicked)
    //   {
    //   $newdiv=(<div className="col-md-12"><div className="entry-field"><div className="entry-detail"><textarea rows="3" className="description"/></div><div className="add-buttion"><button> add </button></div></div></div>);
    //   }
    //   else {$newdiv = '';}

    const { translations } = this.props;

    const generalFields = [
      { name: 'COCOM', type: 'dropdown', ddID: 'COCOM' , valFieldID: 'COCOMId', domID: 'COCOM'},
      { name: 'Branch', type: 'dropdown', ddID: 'BranchOfService',  valFieldID: 'BranchId', domID: 'Branch'},
      { name: 'Country', type: 'dropdown', ddID: 'Countries',  valFieldID: 'CountryId', domID: 'Country'},
      { name: 'Region', type: 'dropdown', ddID: 'Regions',  valFieldID: 'RegionId', domID: 'Region'},
      { name: 'Unit', type: 'dropdown',ddID: 'Units/GetUnits',  valFieldID: 'UnitId', domID: 'Unit'},
      { name: 'Commander', type: 'dropdown', ddID: 'Personnel/GetCommanderList',  valFieldID: 'CommanderId', domID: 'Commander'},
      { name: 'Operation/Mission Name', type: 'input',  valFieldID: 'MissionName', domID: 'Opname'},
      { name: 'Effective Area KML', type: 'file',  valFieldID: 'EffectiveAreaKML', domID: 'KML'}
    ];

    const ccirFields = [
      { name: translations['ccir1'], type: 'textarea',  valFieldID: 'Description1', domID: 'desc1', required:true },
      { name: translations['ccir2'], type: 'textarea',  valFieldID: 'Description2', domID: 'desc2' },
      { name: translations['ccir3'], type: 'textarea',  valFieldID: 'Description3', domID: 'desc3' },
      { name: translations['ccir4'], type: 'textarea',  valFieldID: 'Description4', domID: 'desc4' },
    ];

    const pirFields = [
      { name: translations['pir1'], type: 'textarea',  valFieldID: 'Description5', domID: 'desc5', required:true },
      { name: translations['pir2'], type: 'textarea',  valFieldID: 'Description6', domID: 'desc6' },
      { name: translations['pir3'], type: 'textarea',  valFieldID: 'Description7', domID: 'desc7' },
      { name: translations['pir4'], type: 'textarea',  valFieldID: 'Description8', domID: 'desc8' },
    ];

    return (
      
      <form action="" onSubmit={this.handleSubmit} >
        <div className="payload-content">
        <Loader loading={this.state.loading} />
          <div className="row personnel" >

            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt=""/>
              <div className="header-text">
                {translations['Add Ccir/Pirs']}
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
            </div>
          </div>
          <div className="row personnel" >
            <div className="under-payload-content">
              <ContentBlock fields={generalFields} editId={this.props.editId} data={this.handleCcirPirGeneralData}
                headerLine="/assets/img/admin/upload_1.png" title={translations["Ccir/Pir"]}
                initstate ={this.props.oneCcirPir} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>

              <ContentBlock fields={ccirFields} editId={this.props.editId} data={this.handleCcirData}
                headerLine="/assets/img/admin/upload_1.png" title={translations["ccir"]}
                initstate ={this.props.oneCcirPir} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
            
              <ContentBlock fields={pirFields} editId={this.props.editId} data={this.handlePirData}
                headerLine="/assets/img/admin/upload_1.png" title={translations["pir"]}
                initstate ={this.props.oneCcirPir} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
            </div>
          </div>
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="button" className="highlighted-button" onClick={this.resetForm.bind(this)}>
              {translations.clear}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
         
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="submit" className="highlighted-button">
              {/* {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']} */}
              {translations['submit']}

            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>

          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="submit" className="highlighted-button" onClick={() => this.props.onClose()}>
              {translations['close']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
        </div>

      </form>
      
    );
  }
}

CcirPirModal.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneCcirPir: state.ccirpir.oneCcirPir,
  };
};

const mapDispatchToProps = {
  addCcirPir,
  updateCcirPir,
  fetchCcirPirById,
};

export default connect(mapStateToProps, mapDispatchToProps)(CcirPirModal);

//export default CcirPirModal;