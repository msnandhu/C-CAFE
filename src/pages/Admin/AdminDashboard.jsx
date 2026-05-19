import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  return (
    <div className="page-container">
      <Navbar title="Analytics Dashboard" />
      <div className="card glass">
        <h3>Sales Analytics</h3>
        <p>Charts and graphs will be displayed here in Phase 2.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
