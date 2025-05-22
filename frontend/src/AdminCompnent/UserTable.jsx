import UserRow from './UserRow';

export default function UserTable({ users, onUsersChange }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Current Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserRow 
            key={user.id || user._id} 
            user={user}
            onUsersChange={onUsersChange}
          />
        ))}
      </tbody>
    </table>
  );
}