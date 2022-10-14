import { useNavigate } from "react-router-dom";
import { lockUnlockUser } from "../api/lockUnlockUser";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

type UserProps = {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  status: string;
  updated_at: string;
  url: string;
};

type UserListProps = {
  user: UserProps;
  loading: boolean;
  updateUserList: (user: UserProps) => void;
};

function UserData({ user, loading, updateUserList }: UserListProps) {
  const navigate = useNavigate();
  const currentUser = user;
  const userLocked = currentUser?.status === "locked";

  const changeUserStatus = () => {
    lockUnlockUser(currentUser.id, userLocked).then((result) => {
      if (result === "success") {
        updateUserList({
          ...currentUser,
          status: userLocked ? "active" : "locked",
        });
      }
    });
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <tr key={currentUser.id}>
      <td>{currentUser.first_name}</td>
      <td>{currentUser.last_name}</td>
      <td>{new Date(currentUser.created_at).toString().slice(0, 24)}</td>
      <td>
        <button
          onClick={() =>
            navigate(
              `/edit/?id=${currentUser.id}&first=${currentUser.first_name}&last=${currentUser.last_name}`
            )
          }
        >
          <ManageAccountsOutlinedIcon style={{ color: "#ffffff" }} />
        </button>
      </td>
      <td>
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Lock or unlock user"
          onClick={() => changeUserStatus()}
        >
          {userLocked ? (
            <LockOutlinedIcon style={{ color: "#ffffff" }} />
          ) : (
            <LockOpenOutlinedIcon style={{ color: "#ffffff" }} />
          )}
        </button>
      </td>
    </tr>
  );
}

export default UserData;
