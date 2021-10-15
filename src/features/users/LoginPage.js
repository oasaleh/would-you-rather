const LoginPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);

  const userNames = users.map((user) => <option key={user.id}>{user.name}</option>);
  return (
    <>
      <h3>Login</h3>
      <select onChange={}>{userNames}</select>
    </>
  );
};
