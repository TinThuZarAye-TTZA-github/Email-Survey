import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancle, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please review the form</h5>
      {reviewFields}
      <button className='yellow darken-3 btn-flat' onClick={onCancle}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className='green btn-flat right'
      >
        Send Survey
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
