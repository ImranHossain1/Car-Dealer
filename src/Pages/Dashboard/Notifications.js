import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useNotifications from "../../hooks/useNotifications";
import Notification from "./Notification";
import { Button, Typography } from "@mui/material";
import PageTitle from "../Shared/PageTitle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Notifications = () => {
  const [messages, isLoading, refetch] = useNotifications();
  const [unread, setUnread] = useState(false);
  let count = 0;
  if (isLoading) {
    return <Loading></Loading>;
  }
  const notify = {
    unread: false,
  };
  const handleNotification = (id) => {
    fetch(`https://car-dealer-server.onrender.com/notification/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(notify),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };
  messages?.forEach((message) => {
    if (message.unread) {
      count++;
    }
  });
  const handleUnread = () => {
    setUnread(true);
  };
  const handleRead = () => {
    setUnread(false);
  };
  return (
    <>
      <PageTitle title="Notifications"></PageTitle>
      <Typography
        variant="h4"
        textAlign="center"
        style={{ fontWeight: 700 }}
        sx={{ my: 5 }}
      >
        Notifications{" "}
        {!(count === 0) && (
          <small style={{ color: "red" }}>({count} new message)</small>
        )}
        {!unread ? (
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            style={{ backgroundColor: "green" }}
            onClick={handleUnread}
          >
            See Unread Messages
          </Button>
        ) : (
          <Button variant="contained" sx={{ ml: 2 }} onClick={handleRead}>
            See All Messages
          </Button>
        )}
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="center">Subject</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages?.map((message, index) => (
              <Notification
                key={message._id}
                index={index}
                unread={unread}
                message={message}
                handleNotification={handleNotification}
                refetch={refetch}
              ></Notification>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Notifications;
