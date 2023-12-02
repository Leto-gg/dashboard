import { PureComponent } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends PureComponent {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
