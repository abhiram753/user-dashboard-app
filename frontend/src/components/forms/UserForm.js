import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';

const UserForm = ({ initialData = {}, onSubmit, loading = false, submitText = 'Submit' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: initialData
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng)
      };
      await onSubmit(formattedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset(initialData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Personal Information */}
      <fieldset className="mb-4">
        <legend>Personal Information</legend>

        <FormInput
          label="Full Name"
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
          error={errors.name?.message}
          placeholder="Enter full name"
        />

        <FormInput
          label="Email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email?.message}
          placeholder="Enter email address"
        />

        <FormInput
          label="Phone"
          {...register('phone', {
            required: 'Phone is required',
            pattern: { value: /^[+]?[1-9][\d]{0,15}$/, message: 'Invalid phone number' }
          })}
          error={errors.phone?.message}
          placeholder="Enter phone number"
        />

        <FormInput
          label="Company"
          {...register('company', {
            required: 'Company is required',
            minLength: { value: 2, message: 'Company name must be at least 2 characters' }
          })}
          error={errors.company?.message}
          placeholder="Enter company name"
        />
      </fieldset>

      {/* Address Information */}
      <fieldset className="mb-4">
        <legend>Address Information</legend>

        <FormInput
          label="Street Address"
          {...register('street', {
            required: 'Street address is required',
            minLength: { value: 5, message: 'Street address must be at least 5 characters' }
          })}
          error={errors.street?.message}
          placeholder="Enter street address"
        />

        <div className="row g-3">
          <div className="col-md-6">
            <FormInput
              label="City"
              {...register('city', {
                required: 'City is required',
                minLength: { value: 2, message: 'City must be at least 2 characters' }
              })}
              error={errors.city?.message}
              placeholder="Enter city"
            />
          </div>
          <div className="col-md-6">
            <FormInput
              label="Zipcode"
              {...register('zipcode', {
                required: 'Zipcode is required',
                pattern: { value: /^[\d]{5,10}$/, message: 'Invalid zipcode format' }
              })}
              error={errors.zipcode?.message}
              placeholder="Enter zipcode"
            />
          </div>
        </div>
      </fieldset>

      {/* Geo Location */}
      <fieldset className="mb-4">
        <legend>Geo Location</legend>
        <div className="row g-3">
          <div className="col-md-6">
            <FormInput
              label="Latitude"
              type="number"
              step="any"
              {...register('lat', {
                required: 'Latitude is required',
                min: { value: -90, message: 'Latitude must be between -90 and 90' },
                max: { value: 90, message: 'Latitude must be between -90 and 90' }
              })}
              error={errors.lat?.message}
              placeholder="Enter latitude"
            />
          </div>
          <div className="col-md-6">
            <FormInput
              label="Longitude"
              type="number"
              step="any"
              {...register('lng', {
                required: 'Longitude is required',
                min: { value: -180, message: 'Longitude must be between -180 and 180' },
                max: { value: 180, message: 'Longitude must be between -180 and 180' }
              })}
              error={errors.lng?.message}
              placeholder="Enter longitude"
            />
          </div>
        </div>
      </fieldset>

      {/* Actions */}
      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary"
          disabled={loading || isSubmitting}
        >
          Reset
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? 'Please wait...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
