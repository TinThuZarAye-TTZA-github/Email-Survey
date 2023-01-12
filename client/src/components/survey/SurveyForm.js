//Survey Form for the user to inport the details

import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderField() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          type='text'
          component={SurveyField}
          name={name}
          label={label}
        ></Field>
      );
    });
    // return _.map(FIELD, ({ label, name }) => {
    //   return (
    //     <Field
    //     key={name}
    //       component={SurveyField}
    //       type='text'
    //       label={label}
    //       name={name}
    //     ></Field>
    //   );
    // });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderField()}
          <Link to='/survey' className='red btn-flat left white-text'>
            Cancel
          </Link>
          <button type='submit' className='teal btn-flat right white-text'>
            Next
            <i className='meterial-icons right'></i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You mush provide a value';
    }
  });

  // errors.emails = validateEmails(values.emails || '');

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
