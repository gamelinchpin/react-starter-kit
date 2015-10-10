import React, { PropTypes, Component } from 'react';

var FluxIntent = React.createClass({
   render: function() {
    var self = this, customers = this.props.customers;
console.log("ping");
    if (customers === null) {
      return (
        <div>Loading Data</div>
      );
    }

    return (
      <ul>
        {Object.keys(customers).map(function(customer){
          return (
            <li key={customer}>
              <h1 className="name">Something</h1>
            </li>
          )
        })}
      </ul>
    );
   }
});

module.exports = FluxIntent;
