import React from "react";

const UserOptions = ({ user }) => {
  return (
    <>
      {user.name}
      <img src={user.avatar.url && user.avatar.url} alt="" />
    </>
  );
};

export default UserOptions;
