import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../utils/fetch";
import { getToken } from "../../utils/local";
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
const StyledContainer = styled(Container)({
  marginTop: "50px",
});
// import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkAdminStatus = () => {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "admin") {
        setIsAdmin(true);
        fetchUsers();
      } else {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!isAdmin) {
    return <Typography variant="h6">Access denied. Admins only.</Typography>;
  }

  return (
    <StyledContainer>
    <Container>
      <Typography variant="h4" gutterBottom>Users</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {users.map(user => (
            <ListItem key={user._id} divider>
              <ListItemText
                primary={`Username: ${user.username}`}
                secondary={`Email: ${user.email} | Role: ${user.role}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
    </StyledContainer>
  );
};

export default Users;
