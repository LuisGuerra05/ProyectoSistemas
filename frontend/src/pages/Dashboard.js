function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {[...Array(50)].map((_, i) => (
        <p key={i}>Row {i + 1}: Simulated data row...</p>
      ))}
    </div>
  );
}

export default Dashboard;
