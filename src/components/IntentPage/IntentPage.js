
import React, { PropTypes, Component } from 'react';
import styles from './IntentPage.css';
import withStyles from '../../decorators/withStyles';
import db from '../../core/MysqlClient';
import FluxIntent from '../FluxIntent';

var IntentPage = React.createClass({
  // static contextTypes = {
  //   onSetTitle: PropTypes.func.isRequired,
  // };
  propTypes: {
    // path: React.PropTypes.string.isRequired,
    // onSetTitle: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {customerData: null};
  },
  getState: function() {
    if (this.state.customerData !== null) {
      return;
    }

    var sql = 'SELECT orders.ID,ORDER_EXPIRE,ORDER_DATE,ITEMS,users.USER_EMAIL,USER_FIRSTNAME,USER_SURNAME';
    sql += ',orders.sec_ip_address,orders.sec_http_agent as device,IFNULL(users.DATE, "1970-01-01") as account_created';
    sql += ',(SELECT session_id FROM users_logins WHERE users_logins.user_id=orders.USER_ID ORDER BY users_logins.id DESC LIMIT 1) as session_id';
    sql += ',(SELECT COUNT(product_feedback.USER_ID) FROM `product_feedback` WHERE `DATE`>=DATE_ADD(NOW(), INTERVAL -1 HOUR) AND product_feedback.USER_ID=orders.USER_ID) as fb_count1';
    sql += ',(SELECT COUNT(product_feedback.USER_ID) FROM `product_feedback` WHERE `DATE`>=DATE_ADD(NOW(), INTERVAL -6 HOUR) AND product_feedback.USER_ID=orders.USER_ID) as fb_count6';
    sql += ',users_profile_attributes.* FROM orders';
    sql += ' LEFT JOIN users ON users.ID=orders.USER_ID';
    sql += ' LEFT JOIN users_profile_attributes ON users_profile_attributes.user_id=orders.USER_ID';
    sql += " WHERE ORDER_STATUS='TEMP' AND ORDER_DATE>=UNIX_TIMESTAMP(DATE_ADD(NOW(), INTERVAL -10 MINUTE))";
    sql += " ORDER BY orders.USER_ID ASC";

    console.log("fetching data");
    db.q(sql).then(output => {
        if (output !== undefined) {
          console.log("got data");
          this.setState({customerData: output});
        } else {
          this.setState({customerData: null});
        }
    });
  },
  render: function() {
    const title = 'Intent';
    this.getState();

    return (
      <div className="IntentPage">
        <div className="IntentPage-container">
          <h1>{title}</h1>
          <FluxIntent customers={this.state.customerData} />
        </div>
      </div>
    );
  }

});

export default IntentPage;
