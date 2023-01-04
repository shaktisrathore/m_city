import React from 'react';
import PropTypes from 'prop-types';

import AdminNav from '../components/admin/nav';

const AdminLayout = props => {
  const { children } = props;
  return (
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav />
      </div>
      <div className="admin_right">
        {children}
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.any,
};

export default AdminLayout;
