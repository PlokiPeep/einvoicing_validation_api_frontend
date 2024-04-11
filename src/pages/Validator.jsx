import React from 'react';
import { BasicPage } from "./BasicPage";
import { useParams } from 'react-router-dom';
import ValidatorBox from '../components/ValidatorBox';

const Validator = () => {
  // const { user } = useAuth();
  const { invoiceId } = useParams();

  return (
  <BasicPage title="Invoice Validator" backButton={true} >
    <ValidatorBox
      invoiceId={invoiceId}
    />
  </BasicPage>
  );
};

export default Validator;

