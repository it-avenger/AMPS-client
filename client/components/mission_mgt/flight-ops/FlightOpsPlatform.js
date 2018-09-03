import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, MissionConsts } from '../../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, formatDateTime } from '../../../util/helpers';
import { flightOpsAtoPlatform, flightOpsPlatforms, moveToFlightOPSFromATO, moveToATOFromFlightOPS } from 'actions/mssionmgt';
import FullHeaderLine from '../../reusable/FullHeaderLine';
import TimelineFilter from '../../reusable/TimelineFilter';

class FlightOpsPlatform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.PLATFORM,
      tab: MissionConsts.TABS.FOP,
      radioPlatformInvenotryId: '',
      teamId: '',
      showUnitType: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  getColor= (row)=>{
    return getIntelStatusColor(row.original.Abbreviation);
  }

  // Move Left to Right
  // Updates PlatformInventoryId in mission
  moveToFlightOpPlatform = (row) => {
    
    const missionId = row.original.MissionId;
    // const intelRequestID = row.original.IntelRequestID;
    if(this.state.radioPlatformInvenotryId !== undefined && this.state.radioPlatformInvenotryId !== 0) {
      const data = {
        'Id': missionId,
        // 'IntelReqID': intelRequestID,
        'PlatformInventoryID': this.state.radioPlatformInvenotryId,
        'Type': 'Platforms',
      };
      this.props.moveToFlightOPSFromATO(missionId, data).then(() => {
        this.loadData();
      });
    } else {
      alert('Please Select Platform');
    }
  }

  // Move Right to Left
  // Updates PlatformInventoryId to null in mission
  moveToAtoPlatform = (row) => {
    this.props.moveToATOFromFlightOPS(row.original.MissionId).then(() => {
      this.loadData();
    });
  }

  loadData = () => {
    const unitId = 25;
    // Left Table: Status = AAG and Platfomr Id == null
    this.props.flightOpsAtoPlatform(unitId);
    // Right Table: Status = AAG and Platfomr Id != null
    this.props.flightOpsPlatforms(unitId);
  };

  radioFilterSelect=(value)=> {
    this.setState({
      radioPlatformInvenotryId: value,
    });
  }

  render() {

    const { translations, fopPlatforms, fopPlatformAto } = this.props;

    const columnsATOGenerations = [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
      },
      {
        Header: translations.Priority,
        accessor: 'Priority',
      },
      {
        Header: translations.Command,
        accessor: 'COCOMText',
      },
      {
        Header: translations['Mission Type'],
        accessor: 'MissionTypeText',
      },
      {
        Header: 'Payload',
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: translations['Armed'],
        accessor: 'IsArmed',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        Header: translations['Date/Time'],
        id: 'BestCollectionTime',
        accessor: d => {
          return formatDateTime(d.BestCollectionTime);
        },
      },
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Flight Ops" onClick={() => this.moveToFlightOpPlatform(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            &nbsp;
            {/* <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
          </div>
        ),
      },
    ];

    const columnsFlightOps = [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
      },
      {
        Header: translations.Priority,
        accessor: 'Priority',
      },
      {
        Header: translations.Command,
        accessor: 'COCOMText',
      },
      {
        Header: translations['Mission Type'],
        accessor: 'MissionTypeText',
      },
      {
        Header: translations['Date/Time'],
        id: 'BestCollectionTime',
        accessor: d => {
          return formatDateTime(d.BestCollectionTime);
        },
      },
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveToAtoPlatform(row)}> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
          </div>
        ),
      },
    ];

    return (
      <div>
        <TimelineFilter translations={translations} headerTxt={translations.flightops} defaultResource={this.state.defaultResource} tab={this.state.tab} radioFilterSelect={this.radioFilterSelect} updateResource={this.props.updateResource} />
        <div className="row mission-mgt">
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={fopPlatformAto}
                    columns={columnsATOGenerations}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
                    className="-striped -highlight"
                    filterable={false}
                    showPageSizeOptions={true}
                    previousText="&#8678;"
                    nextText="&#8680;"
                    defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <FullHeaderLine headerText={translations.FlightOPS} />
                <div >
                  <ReactTable
                    data={fopPlatforms}
                    columns={columnsFlightOps}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
                    className="-striped -highlight"
                    filterable={false}
                    showPagination={true}
                    previousText="&#8678;"
                    nextText="&#8680;"
                    defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

FlightOpsPlatform.propTypes = {
  children: PropTypes.element,
  updateResource: PropTypes.func,

};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    fopPlatformAto: state.mssionmgts.fopPlatformAto,
    fopPlatforms: state.mssionmgts.fopPlatforms,
  };
};

const mapDispatchToProps = {
  flightOpsAtoPlatform,
  flightOpsPlatforms,
  moveToFlightOPSFromATO,
  moveToATOFromFlightOPS,

};
export default connect(mapStateToProps, mapDispatchToProps)(FlightOpsPlatform);
