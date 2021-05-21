import React, { Fragment } from "react";

const Spinner = () => {
  return (
    // Fragment is used as nodiv "<></>".
    <Fragment>
      <img
        src="https://raw.githubusercontent.com/bradtraversy/github-finder/master/src/components/layout/spinner.gif"
        alt="Loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      ></img>
    </Fragment>
  );
};

export default Spinner;
