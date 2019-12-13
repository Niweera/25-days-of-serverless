import React, { Component } from "react";
import { withFirebase, firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

class Dashboard extends Component {
  render() {
    const { ordered } = this.props;
    const deliverySystemStatus =
      ordered.northpole && ordered.northpole[0].status;
    const ReindeerSystemStatus =
      ordered.northpole && ordered.northpole[1].status;
    let deliveryStatus;
    let reindeerStatus;
    let deliveryStatusClassName;
    let reindeerStatusClassName;
    switch (deliverySystemStatus) {
      case "Open":
        deliveryStatus =
          "NorthPole we have a problem and we will be investigating the issue...";
        deliveryStatusClassName = "badge badge-danger";
        break;
      case "Closed":
        deliveryStatus = "Online";
        deliveryStatusClassName = "badge badge-success";
        break;
      default:
        deliveryStatus = "NorthPole we are still investigating the issue...";
        deliveryStatusClassName = "badge badge-warning";
        break;
    }

    switch (ReindeerSystemStatus) {
      case "Open":
        reindeerStatus =
          "NorthPole we have a problem and we will be investigating the issue...";
        reindeerStatusClassName = "badge badge-danger";
        break;
      case "Closed":
        reindeerStatus = "Online";
        reindeerStatusClassName = "badge badge-success";
        break;
      default:
        reindeerStatus = "NorthPole we are still investigating the issue...";
        reindeerStatusClassName = "badge badge-warning";
        break;
    }

    return (
      <div className="container mt-4 mb-4">
        {ordered.northpole && (
          <div
            className="jumbotron jumbotron-fluid"
            style={{
              backgroundColor: "#3b3a30",
              textShadow: "0 1px 3px rgba(0,0,0,.5)",
              color: "white"
            }}
          >
            <div className="container text-left">
              <h6 className="h6">
                Delivery System Status:{" "}
                <span className={deliveryStatusClassName}>
                  {deliveryStatus}
                </span>
              </h6>
              <h6 className="h6">
                ReinDeer Guidance System Status:{" "}
                <span className={reindeerStatusClassName}>
                  {reindeerStatus}
                </span>
              </h6>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  firebase: { auth, profile },
  firestore: { ordered, status }
}) => ({
  auth,
  profile,
  ordered,
  status
});

export default compose(
  withRouter,
  withFirebase,
  firestoreConnect([{ collection: "northpole" }]),
  connect(mapStateToProps)
)(Dashboard);
