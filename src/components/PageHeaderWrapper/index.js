
import React from 'react';
import PageHeader from '../PageHeader';

const PageHeaderWrapper = ({ children, ...props }) => (
  <>
    <PageHeader {...props}>
      {children}
    </PageHeader>
  </>
);

export default PageHeaderWrapper;
