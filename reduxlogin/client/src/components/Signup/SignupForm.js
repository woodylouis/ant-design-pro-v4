import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false
    }
  }

  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.userSignupRequest(this.state).then(
      () => {
        this.props.history.push('/');
      },
      ({ response }) => { this.setState({ errors: response.data, isLoading: false }) }
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={ this.onSubmit }>
        <h1>Join our community!</h1>

        <div className="form-group">
          <label className="control-label">Username</label>

          <input
            value={ this.state.username }
            onChange={ this.onChange }
            type="text"
            name="username"
            className={ classnames('form-control', { 'is-invalid': errors.username }) }
          />
          { errors.username && <span className='form-text text-muted'>{ errors.username }</span> }
        </div>

        <div className="form-group">
          <label className="control-label">Email</label>

          <input
            value={ this.state.email }
            onChange={ this.onChange }
            type="email"
            name="email"
            className={ classnames('form-control', { 'is-invalid': errors.email }) }
          />
          { errors.email && <span className='form-text text-muted'>{ errors.email }</span> }
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>

          <input
            value={ this.state.password }
            onChange={ this.onChange }
            type="password"
            name="password"
            className={ classnames('form-control', { 'is-invalid': errors.password }) }
          />
          { errors.password && <span className='form-text text-muted'>{ errors.password }</span> }
        </div>

        <div className="form-group">
          <label className="control-label">Password Confirmation</label>

          <input
            value={ this.state.passwordConfirmation }
            onChange={ this.onChange }
            type="password"
            name="passwordConfirmation"
            className={ classnames('form-control', { 'is-invalid': errors.passwordConfirmation }) }
          />
          { errors.passwordConfirmation && <span className='form-text text-muted'>{ errors.passwordConfirmation }</span> }
        </div>

        <div className="form-group">
          <button disabled={ this.state.isLoading } className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SignupForm);
