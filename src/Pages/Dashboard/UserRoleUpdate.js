import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};
const UserRoleUpdate = ({
  user,
  openRoleEdit,
  refetch,
  handleRoleEditClose,
}) => {
  const { _id, email, role, name } = user;
  const handleCancel = (e) => {
    handleRoleEditClose(false);
  };
  const makeAdmin = () => {
    //console.log(email);
    fetch(
      `https://car-server-d4s0106ne-imranhossain1.vercel.app/user/admin/${email}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to make an Admin");
          handleRoleEditClose(false);
        }
        return res.json();
      })
      .then((data) => {
        if (data.result.modifiedCount > 0) {
          refetch();
          toast.success(`Successfully made an admin`);
          handleRoleEditClose(false);
        }
      });
  };
  return (
    <Modal
      open={openRoleEdit}
      onClose={handleRoleEditClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} width={{ xs: 380, sm: 500, md: 600 }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontWeight: 700, textAlign: "center" }}
        >
          Are you sure, you want to make{" "}
          <span style={{ color: "#c0392b" }}>{name}</span> Admin?
        </Typography>
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <Button
            onClick={makeAdmin}
            variant="contained"
            style={{ marginRight: "15px", backgroundColor: "#a93226" }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            onClick={handleCancel}
            style={{ backgroundColor: "green" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserRoleUpdate;
