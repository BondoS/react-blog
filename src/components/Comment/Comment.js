import React, { Fragment } from "react";
import "./comment.css";

function comment({ item }) {
  return (
    <Fragment>
      <div className="row">
        <div className=" offset-md-2 col-md-8">
          <div className="media g-mb-30 media-comment">
            <img
              className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
              src={item.user.imageUrl}
              alt="Image Description"
            />
            <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
              <div className="g-mb-15">
                <h5 className="h5 g-color-gray-dark-v1 mb-0">
                  {item.user.name}
                </h5>
                <span className="g-color-gray-dark-v4 g-font-size-12">
                  {item.time}
                </span>
              </div>

              <p>{item.text}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default comment;
