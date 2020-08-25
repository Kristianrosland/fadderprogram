import React from "react";
import resource from "../Frontend/textResources";

const ErrorLabel = ({ textKey }) => {
  return <div className="error-label">{resource(textKey)}</div>;
};

export default ErrorLabel;
