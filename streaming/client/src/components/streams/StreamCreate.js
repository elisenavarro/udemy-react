import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
imporet { createStream } from '../../actions';

class StreamCreate extends Component{
  renderError({ error, touched }){
    if (touched && error){
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className=`field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off'/>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit(formValues){  
    this.props.createStream(formValues);
  }

  render(){
    return (
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className='ui form error'
      >
        <Field 
          name="title" 
          label='Enter Title' 
          component={this.renderInput}
        />
        <Field 
          name="description" 
          label='Enter Description' 
          component={this.renderInput}
        />
        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

// called anytime user interacts with form, re-renders form component
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Enter a valid title';
  }
  if (!formValues.description) {
    errors.description = 'Enter a valid description';
  }
  return errors;
}

// reduxForm returns fuction and immediately calls StreamCreate
const formWrapped = reduxForm({
  form: 'streamCreate', 
  validate: validate
})(StreamCreate);

export default connect(null, {createStream})(formWrapped);