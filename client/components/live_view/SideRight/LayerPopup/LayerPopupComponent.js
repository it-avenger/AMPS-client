import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectBox from '../../../reusable/SelectBox';
import PopupListingItem from '../PopupListingItem';
import CheckBox from '../../../reusable/CheckBox';
import { fetchLocationKMLs, fetchLocationTypes } from 'actions/location';
import { fetchMapLayers } from 'actions/liveview';

import './LayerPopupComponent.scss';

class LayerPopupComponent extends React.Component {

  constructor(props) {
    super(props);
    // Static data to load map layer icons
    this.state = {
      showAll: true,
     static_data : {
          air :{
              length : 25,
              imageId : 'airplane_logo'
          },
          maritime :{
              length : 50,
              imageId : 'boat'
          },
          personnel :{
              length : 30,
              imageId : 'people_logo'
          },
          sensor :{
              length : 90,
              imageId : 'bolt_logo'
          },
          blue_forces :{
              length : 10,
              imageId : 'horse_logo'
          },
          bases :{
              length : 12,
              imageId : 'house_logo'
          },
          intel_requirement :{
              length : 30,
              imageId : 'paper_list_logo'
          },
          pois :{
              length : 10,
              imageId : 'star_logo'
          },
          ci :{
              length : 25,
              imageId : 'eye_logo'
          },
          sigint :{
              length : 10,
              imageId : 'stats_logo'
          },
          oswt :{
              length : 20,
              imageId : 'megaphone_logo'
          },
          gmti :{
              length : 30,
              imageId : 'pointer_logo'
          },
          intel_request_collection_point :{
              length : 15,
              imageId : 'cross_logo'
          },
          observation :{
              length : 20,
              imageId : 'lens_logo'
          },
          media :{
              length : 12,
              imageId : 'photocamera_logo'
          }
      }
    };

    // Code to create the points
    //console.log( this.props);
    let key = Object.keys(this.state.static_data);
    for(let i=0 ; i < key.length ; i++){
        let len = this.state.static_data[key[i]].length;
        for(let j=0;j<len;j++){
            let min=0;
            let max=200;
            let lat = Math.random() * (+max - +min) + +min;
            let lon = Math.random() * (+max - +min) + +min;
            let map_str = key[i] + "_" + j;
            // this.props.toggleMapLayer(map_str);
            //call 3D pin
            this.props.add3DPin(lat, lon, this.state.static_data[key[i]].imageId, '', map_str, '', '', true);
            //console.log("3DPIN", map_str, lon, lat, this.state.static_data[key[i]].imageId);
        }

    }


  }

  componentDidMount() {
    //this.props.fetchLocationKMLs();
    this.props.fetchLocationTypes();
    // Fetch All Layers to Display in the right side tool bar Layers Button
    this.props.fetchMapLayers();
  }

  onChangeShowAll = (state) => {
    this.setState({
      showAll: state,
    }, () => {
      if(state) {
        this.props.addPin(0, 0, null, null, null, 'PLATFORMS-PARENT');
      } else {
        this.props.removePin('PLATFORMS-PARENT');
      }
    });
  }

  getFilterOptions = (data) => {
    if(data) {
      const arrItems = data.map((item) => {
        return { value: item.id, label: item.description };
      });

      arrItems.push({ value: -1, label: 'Map Drawings' });
      return arrItems;
    } else {
      return [];
    }
  }
  myFunction = (number) => {
      const str = number.split(" ").join("_");
      const str_temp = str.toLowerCase();

      if(str_temp in this.state.static_data)
      {
          const length = this.state.static_data[str_temp].length;
          for(let i=0;i<length;i++){
              const map_str = str_temp + "_" + i;
              this.props.toggleMapLayer(map_str);
          }
      }
  }
  render() {

    const { locationKMLs, locationTypes, allLayers} = this.props;

    var static_data = {
      air :{
          length : 25,
          imageId : 'airplane_logo'
      },
      maritime :{
          length : 50,
          imageId : 'boat'
      },
      personnel :{
          length : 30,
          imageId : 'people_logo'
      },
      sensor :{
          length : 90,
          imageId : 'bolt_logo'
      },
      blue_forces :{
          length : 10,
          imageId : 'info_logo'
      },
      bases :{
          length : 12,
          imageId : 'house_logo'
      },
      intel_requirement :{
          length : 30,
          imageId : 'paper_list_logo'
      },
      pois :{
          length : 10,
          imageId : 'star_logo'
      },
      ci :{
          length : 25,
          imageId : 'eye_logo'
      },
      sigint :{
          length : 10,
          imageId : 'stats_logo'
      },
      oswt :{
          length : 20,
          imageId : 'megaphone_logo'
      },
      gmti :{
          length : 30,
          imageId : 'pointer_logo'
      },
      intel_request_collection_point :{
          length : 15,
          imageId : 'cross_logo'
      },
      observation :{
          length : 20,
          imageId : 'lens_logo'
      },
      media :{
          length : 12,
          imageId : 'photocamera_logo'
      }
  };

  for(var i=0 ; i<allLayers.length; i++){
    //console.log(allLayers[i].name);
    var fieldName = allLayers[i].name;
    const str = fieldName.split(" ").join("_");
    const str_temp = str.toLowerCase();
    if(str_temp in static_data)
    {
      //console.log("PPPP "+str_temp+" "+allLayers[i].data+ "    "+allLayers[i].data.length)
      if(allLayers[i].data != null && allLayers[i].data != undefined && allLayers[i].data != ''){
        static_data[str_temp].length = allLayers[i].data.length;
        static_data[str_temp].data = allLayers[i].data;
      }
      else{
        static_data[str_temp].length = 0;
        static_data[str_temp].data = [];
      }
      //console.log("LLLL "+str_temp +" LLLL "+static_data[str_temp].length);
    }
  }//console.log('KKKKK');
  //console.log(static_data);
//debugger;

  let arr =  this.props.allLayers;
  let key = Object.keys(static_data);
  for(let i=1 ; i < key.length ; i++){
      let len = static_data[key[i]].length;
      var data = static_data[key[i]].data;
//console.log("OOOOOO "+ data);
      for(let j=0;j<len;j++){
          let min=0;
          let max=200;
          let lat = 0;
          let lon = 0;  
          if(data !=null && data != undefined && data != '' && data.length>0){
           // console.log("HHHHHHHH "+data);
           // console.log("YYYYYY "+JSON.stringify(data))
            lat = data[j].latitude;
            lon = data[j].longitude;
          }
         // console.log(lat +" "+ lon);
         // let lat = Math.random() * (+max - +min) + +min;
          //let lon = Math.random() * (+max - +min) + +min;
          let map_str = key[i] + "_" + j;
          // this.props.toggleMapLayer(map_str);
          //call 3D pin
          this.props.add3DPin(lat, lon, this.state.static_data[key[i]].imageId, '', map_str, '', '', true);
          //console.log("3DPIN", map_str, lon, lat, this.state.static_data[key[i]].imageId);
      }

  }

    /* const listItem = ['Space', 'Air', 'Maritime', 'Blue Forces'
      , 'Observations',  'Intel Picture', 'SIGACTS', 'Weather','Airfield','Base Locationsnpm ','NAIs','POIs'];
 */
  //const { locationKML } = {'LocationName':'abdf','Category':'xyx', 'LocationLatitude':'76.22', 'LocationLongitude':'76.22','LocationID':'IND',   };

    return (
      <div className={'layers-popup-block popup-block scroll-pane' + ((this.props.layersPopupOpen) ? ' opened' : '')}>
        <div className="title-block">
          LAYERS
          <div
            className="btn-close"
            onClick={() => this.props.onPopup(false)}
          />
        </div>

        <div className="selectmenu-block">
          {
            // <SelectBox
            //   options={ this.getFilterOptions(locationTypes) }
            // />
          }
        </div>
        <div>
          {
            this.props.hasToggle &&
              <div className="d-flex justify-content-center">
                <span className="mr-4">Show All</span>
                <CheckBox
                  defaultValue={this.state.showAll}
                  onChangeState={this.onChangeShowAll}
                />
              </div>
          }
        </div>
        <div className="checklist-block">
          { /*locationKMLs && locationKMLs.map((item, index) => {
            return <PopupListingItem
              color={'#008000'}
              textValue={item.LocationName}
              checked={this.state.showAll}
              hasColorBall={this.props.hasBall}
              popupText={'Location: ' + item.LocationName + ' Category: ' + item.Category}
              // lat={Number(item.LocationLatitude) === 0 ? 38.889931 : Number(item.LocationLatitude)}
              // long={Number(item.LocationLongitude) === 0 ? -77.009003 : Number(item.LocationLongitude)}
              uniqueID={item.LocationID}
              pinColor={'green'}
              pinType={'campsite'}
              // moveMap={this.props.moveMap}
              // addPin={this.props.addPin}
              // removePin={this.props.removePin}
              key={index}
              addKML={this.props.addKML}
              removeKML={this.props.removeKML}
              kmlSrc={item.KML}
              tooltipLabel={item.LocationName}
              tooltipText={'<img src="/assets/img/admin/aircraft.png" style="height:97%;float:left;margin-left:-10px;margin-right:5px;">' +
              item.Category + '<br/>' + item.LocationName + '<br/><br/><a style="color:#ff7c16;float:right;"><strong>Details</strong></a>'}
            />;
          }) */}
          {
            allLayers.map((number) =>
              <div className="popup-item">

              {number.name} <CheckBox onChangeState={this.myFunction.bind(this,number.name)}/>
                  {
                    number.subCategories !=null && number.subCategories != '' && number.subCategories != undefined
                  && number.subCategories.map((subCategory) =>
                    <div className="popup-item">{subCategory.name} <CheckBox  onChangeState={this.myFunction.bind(this,subCategory.name)}/> </div>
                )
              }
                  </div>
          )

          }

        </div>
      </div>
    );
  }
}

LayerPopupComponent.propTypes = {
  addKML: PropTypes.func,
  addPin: PropTypes.func,
  hasBall: PropTypes.bool,
  hasToggle: PropTypes.bool,
  menuClicked: PropTypes.bool,
  moveMap: PropTypes.func,
  onPopup: PropTypes.func,
  popupOpen: PropTypes.bool,
  removeKML: PropTypes.func,
  removePin: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    locationTypes: state.locations.locationTypes,
    isTypesFetching: state.locations.isTypesFetching,
    //locationKMLs: state.locations.locationKMLs,
    isKMLFetching: state.locations.isKMLFetching,
    allLayers: state.locations.allLayers
  };
};

const mapDispatchToProps = {
  fetchLocationKMLs,
  fetchLocationTypes,
  fetchMapLayers,

};

export default connect(mapStateToProps, mapDispatchToProps)(LayerPopupComponent);
