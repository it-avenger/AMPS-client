import PropTypes from 'prop-types';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FullHeaderLine from '../reusable/FullHeaderLine';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import { getIntelRequestStatusCodeColor, defaultFilter } from '../../util/helpers';


class CollectionManagerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      editId: '0',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  deleteApprovedIntelRequests = (value) => {
    if (value !== undefined && value !== '0') {
      const statusId = 7; // 'DRC'
      this.props.deleteApprovedIntelRequestById(value, statusId).then(() => {
        this.setState({ editId: '0' });
        this.notify(NoticeType.DELETE);
        this.loadData();
      });
    }
  };

  getColor= (row)=>{
    return getIntelRequestStatusCodeColor(row.original.Abbreviation);
  }

  moveToCollectionPlan = (row) => {
    const value = row.value;
    if (value !== undefined && value !== '0') {
	    this.props.moveToCollectionPlan(value).then(() => {
	      this.setState({ editId: '0' });
	      this.notify(NoticeType.MOVE_TO_COLLECTION);
	      this.loadData();
      });
    }
  };

  moveToIntelRequest = (value) => {
    if (value !== undefined && value !== '0') {
      this.props.moveToIntelRequest(value).then(() => {
        this.setState({ editId: '0' });
        this.notify(NoticeType.MOVE_TO_INTEL_REQUEST);
        this.loadData();
      });
    }
  };

  routeCollectionIntelRequest = () => {
    const unitId = 25;
    const statusId = 10;// 'APR';
    this.props.routeCollectionIntelRequest(unitId,statusId).then(() => {
      // this.notify(NoticeType.ROUTE_COLLECTION_INTEL_REQUEST);
      this.loadData();
    });
  };

  

  deleteCollectionPlan=(value)=>{
    if (value !== undefined && value !== '0') {
      this.props.deleteCollectionPlanById(value).then(() => {
        this.setState({ editId: '0' });
        this.notify(NoticeType.DELETE);
        this.loadData();
      });
    }
  }

  loadData = () => {
    const unitId = 25;
    let abbreviation = 'AV';
    let isInCollectionPlan = false;
    this.props.fetchApprovedIntelRequests(unitId, abbreviation, isInCollectionPlan);

    isInCollectionPlan = true;
    this.props.fetchCollectionPlans(unitId, abbreviation, isInCollectionPlan);
  };

  notify = actionType => {
    const { translations } = this.props;
    if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['Intel Request update'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.ADD == actionType) {
      NotificationManager.success(translations['Intel Request add'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.MOVE_TO_COLLECTION == actionType) {
      // NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.MOVE_TO_INTEL_REQUEST == actionType) {
      // NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.DELETE == actionType) {
      NotificationManager.success(translations['Intel Request delete'], translations['Intel Request Title'], 5000);
    }
  };

  render() {
    const { translations } = this.props;
    const { allApprovedIntelRequests } = this.props;
    const { allCollectionsPlan } = this.props;
    const editurl = '/intel-request/detail/';
    const intelRequestColumns = [
      {
        Header: 'Request#',
        accessor: 'ReqUserFrndlyID',
        // Cell: row => <div>
        //   <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp;
        //   <span>{row.value}</span>
        // </div>,
      },
      {
        Header: 'Command',
        accessor: 'COCOMText',
      },
      // {
      //   Header: "Status",
      //   accessor: "Status"
      // },
      {
        Header: 'Mission Type',
        accessor: 'MissionTypeText',
      },
      {
        Header: 'Payload',
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: 'Armed',
        accessor: 'Armed',
        Cell: row => <div>
          <span>{row.original.Armed ? 'YES' : 'NO'}</span>
        </div>,
      },
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            {/* <Link to={`${editurl}${row.value}`} className="text-success"  title="Edit" > <span className="glyphicon glyphicon-edit" /> </Link> */}&nbsp;
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Collection Plan" onClick={() => this.moveToCollectionPlan(row)} > <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            <a href="javaScript:void('0');" className="btn btn-danger" title="Delete" onClick={() => this.deleteApprovedIntelRequests(row.value)} ><span className="glyphicon glyphicon-trash" /> </a>
          </div>
        ),
      },
    ];

    const collectionPlanColumns = [
      {
        Header: 'Request# ',
        accessor: 'ReqUserFrndlyID',
        // Cell: row => <div>
        //   <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp;
        //   <span>{row.value}</span>
        // </div>,
      },
      {
        Header: 'Asset',
        accessor: 'Asset',
      },
      {
        Header: 'Priority',
        accessor: 'PriorityIntelRequirement',
      },
      {
        Header: 'Mission Type',
        accessor: 'MissionTypeText',
      },
      {
        Header: 'Payload',
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: 'Armed',
        accessor: 'Armed',
        Cell: row => <div>
          <span>{row.original.Armed ? 'YES' : 'NO'}</span>
        </div>,
      },
      /*   {
        Header: 'Command',
        accessor: 'COCOMText',
      }, */
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Intel Request" onClick={() => this.moveToIntelRequest(row.value)} > <span className="glyphicon glyphicon-circle-arrow-left" /> </a>
            &nbsp;
          </div>
        ),
      },
    ];

    const langs = ['val 1', 'val 2'];
    return (
      <div>
        <div className="row intel-request">
          <div className="col-md-12 two-block">
            <FullHeaderLine headerText={translations.CollectionMap} />
            <img
              className="photo"
              src="/assets/img/intel_request/request/request_pic.png"
              alt=""
            />
          </div>

          {/* <div className="col-md-6 two-block">

          </div> */}

          {/* <div className="col-md-6">

          </div> */}
          <div className="col-md-12">

            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.IntelRequests} />
                <div >
                  <ReactTable
                    data={allApprovedIntelRequests}
                    columns={intelRequestColumns}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
                    /*                     showPaginationTop={false}
                    showPaginationBottom={true} */
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
                <FullHeaderLine headerText={translations.CollectionPlan} />
                <div >
                  <ReactTable
                    data={allCollectionsPlan}
                    columns={collectionPlanColumns}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
                    /*                  showPaginationTop={false}
                    showPaginationBottom={true} */
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
            <div className="row intel-request-table-margin-top">
              <div className="col-md-12 text-center">
                {/* <img className="line" src="/assets/img/admin/edit_up.png" alt=""/> */}
                <a href= "Javascript:void(0)" className="btn btn-warning btn-lg" onClick={() => this.routeCollectionIntelRequest()} >
                    Route
                </a>
                {/* <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/> */}
              </div>
            </div>
          </div>
        
        
        </div>
      </div>
    );
  }
}

CollectionManagerComponent.propTypes = {
  children: PropTypes.element,
};

export default CollectionManagerComponent;
