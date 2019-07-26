/**React */
import React from "react";
import { Link } from "react-router-dom";

class CustomLink extends React.Component {
  render(){
	return (
			<span>
			{this.props.enabled ?
 			<Link to={{ pathname: this.props.pathname, state: { rowID: this.props.rowID, name: this.props.name } }}>
 				{this.props.children}
            </Link>: this.props.children}
            </span>
	);
  }
}

export default CustomLink;
