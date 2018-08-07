import React from 'react';
import Tree from 'react-d3-tree';
import PropTypes from 'prop-types';
import NodeElement from './NodeElement';

class TreeComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {      
      containerStyles: {
        width: '100%',
        height: '100vh',
      },
      separation: { siblings: 2, nonSiblings: 3 },
      orientation: 'vertical',
      svgSquare: {
        shape: 'rect',
        
        shapeProps: {
          width: 20,
          height: 20,
          x: -10,
          y: -10,
          fill: '#FFFF99',
        },
      },
    };
  }

  componentDidMount() {
    //window.addEventListener('resize', this.updateDimensions);
    this.updateDimension();
  }

updateDimension = () => {
    console.log('transalating');
  const dimensions = this.treeContainer.getBoundingClientRect();
  this.setState({
    translate: {
      x: dimensions.width / 2,
      y: dimensions.height / 8,
    },
  });

}

  render() {
    return (
        
      <div style={this.state.containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree data={this.props.data} collapsible={false} translate={this.state.translate} 
          separation={this.state.separation} allowForeignObjects = {true}
          nodeLabelComponent={{
            render: <NodeElement className="myLabelComponentInSvg" />,
            foreignObjectWrapper: {
              y: -20,
              x: 20,
              width: '20%',
              height: '50%',
            },
          }}
          onClick={this.props.onNodeClick} orientation={this.state.orientation} nodeSvgShape={this.state.svgSquare}/>
      </div>
    );
  }
}

TreeComponent.propTypes = {
  data: PropTypes.array.isRequired,
  onNodeClick: PropTypes.func.isRequired,
};

export default TreeComponent;
