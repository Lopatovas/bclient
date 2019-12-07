import React from 'react';
function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return (<Component {...props} />);
    return (
        <div className="spinner-border text-primary mx-auto mt-2 mb-2" role="status">
            <span className="sr-only">Loading...</span>
        </div>);
  }
}
export default WithLoading;