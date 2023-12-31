import { PureComponent } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends PureComponent {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node.isRequired,
};

export default ErrorBoundary;
