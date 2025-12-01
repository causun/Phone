//import '../../styles/user/user.css';
import NavbarUser from '../../components/NavbarUser';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={{ padding:'20px' }}>
      <NavbarUser />
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
}

export default Profile;
