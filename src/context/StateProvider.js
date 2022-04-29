import React, { createContext, useContext, useEffect, useState } from "react";
const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [taskModal, setTaskModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [monthIndex, setMonthIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [drop, setDrop] = useState(false);
  const [daySpace, setDaySpace] = useState(true);
  const [weekSpace, setWeekSpace] = useState(false);
  const [yearSpace, setYearSpace] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [isFetching, setIsFetching] = useState(false);

  const readCookie = () => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <StateContext.Provider
      value={{
        isFetching,
        setIsFetching,
        yearSpace,
        setYearSpace,
        weekSpace,
        setWeekSpace,
        daySpace,
        setDaySpace,
        drop,
        setDrop,
        selectedNote,
        setSelectedNote,
        editNote,
        setEditNote,
        noteModal,
        setNoteModal,
        editModal,
        setEditModal,
        openModal,
        setOpenModal,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        taskModal,
        setTaskModal,
        userModal,
        setUserModal,
        monthIndex,
        setMonthIndex,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UniversalState = () => {
  return useContext(StateContext);
};

export default StateProvider;
