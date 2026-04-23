import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Chip,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentsIcon from "@mui/icons-material/Payments";
import EventIcon from "@mui/icons-material/Event";
import DeleteIcon from "@mui/icons-material/Delete"; // for reservation delete

import { AuthContext } from "../context/AuthContext";
import API from "../api/Api.jsx";

/* ===============================
   STYLES
================================ */

const DashboardWrapper = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg,#fff5f5,#ffeaea)",
  paddingTop: 40,
});

const StyledCard = styled(Card)({
  borderRadius: 18,
  background: "#ffffffcc",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
});

const StatCard = styled(Card)({
  borderRadius: 18,
  padding: 20,
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
});

const tableStyle = {
  "& .MuiDataGrid-columnHeaders": {
    background: "#e6e6e6",
    color: "#a31414",
    fontWeight: 700,
  },
};

/* ===============================
   TAB COMPONENT
================================ */

const PanelTabs = ({ activePanel, setActivePanel, tabs }) => (
  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
    {tabs.map((tab) => (
      <Button
        key={tab.id}
        variant={activePanel === tab.id ? "contained" : "outlined"}
        onClick={() => setActivePanel(tab.id)}
      >
        {tab.label}
      </Button>
    ))}
  </Box>
);

/* ===============================
   MAIN COMPONENT
================================ */

const AdminDashboard = () => {

const { user } = useContext(AuthContext);

const [activePanel,setActivePanel]=useState("users");
const [users,setUsers]=useState([]);
const [orders,setOrders]=useState([]);
const [reservations,setReservations]=useState([]);

const [loadingUsers,setLoadingUsers]=useState(true);
const [loadingOrders,setLoadingOrders]=useState(true);
const [loadingReservations,setLoadingReservations]=useState(true);

const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [selectedReservation, setSelectedReservation] = useState(null);


/* ✅ FIX — tabs defined INSIDE component */
const tabs = [
  { id: "users", label: "Users" },
  { id: "orders", label: "Orders" },
  { id: "reservations", label: "Reservations" },
];

/* ===============================
   FETCH USERS
================================ */

const fetchUsers = useCallback(async()=>{

if(!user || user.role!=="admin") return;

try{
setLoadingUsers(true);

const res=await API.get("/users/admin");

const formatted=res.data.map((u,index)=>({
id:`USR-${String(index+1).padStart(3,"0")}`,
name:u.name,
email:u.email,
role:u.role==="admin"?"Admin":"Customer",
mongoId:u._id
}));

setUsers(formatted);

}catch(err){
console.error(err);
}
finally{
setLoadingUsers(false);
}

},[user]);

/* ===============================
   FETCH ORDERS
================================ */

const fetchOrders = useCallback(async()=>{

if(!user || user.role!=="admin") return;

try{
setLoadingOrders(true);

const res=await API.get("/orders/admin");

const formatted=res.data.map((o,index)=>({
id:`ORD-${String(index+1).padStart(3,"0")}`,
name:`Customer-${index+1}`,
total:o.total,
status:o.status || "Pending",
mongoId:o._id
}));

setOrders(formatted);

}catch(err){
console.error(err);
}
finally{
setLoadingOrders(false);
}

},[user]);

/* ===============================
   FETCH RESERVATIONS
================================ */

const fetchReservations = useCallback(async()=>{

if(!user || user.role!=="admin") return;

try{
setLoadingReservations(true);

const res=await API.get("/reservation");

const formatted=res.data.map((r,index)=>({
id:`RES-${String(index+1).padStart(3,"0")}`,
name:r.name,
phone:r.phone || "N/A",
date:r.date,
time:r.time,
people:r.people,
mongoId:r._id
}));

setReservations(formatted);

}catch(err){
console.error(err);
}
finally{
setLoadingReservations(false);
}

},[user]);

useEffect(()=>{
fetchUsers();
fetchOrders();
fetchReservations();
},[fetchUsers,fetchOrders,fetchReservations]);

const openDeleteDialog = (reservation) => {
  setSelectedReservation(reservation);
  setDeleteDialogOpen(true);
};

const closeDeleteDialog = () => {
  setDeleteDialogOpen(false);
  setSelectedReservation(null);
};

const confirmDeleteReservation = async () => {
  if (!selectedReservation) return;

  try {
    await API.delete(`/reservation/${selectedReservation.mongoId}`);
    fetchReservations();
  } catch (err) {
    console.error(err);
    alert("Deletion failed");
  }

  closeDeleteDialog();
};

/* ===============================
   STATS
================================ */

const totalRevenue =
orders.reduce((sum,o)=>sum+(o.total||0),0);

const totalReservations = reservations.length;

/* ===============================
   USERS TABLE
================================ */

const userColumns=[
{field:"id",headerName:"User ID",flex:1},
{field:"name",headerName:"Name",flex:1},
{field:"email",headerName:"Email",flex:1.5},
{
field:"role",
headerName:"Role",
flex:1,
renderCell:(p)=>(
<Chip
label={p.value}
color={p.value==="Admin"?"primary":"default"}
/>
)
}
];

/* ===============================
   ORDERS TABLE
================================ */

const orderColumns=[
{field:"id",headerName:"Order ID",flex:1},
{field:"name",headerName:"Customer",flex:1},
{field:"total",headerName:"Total ₹",flex:1},

{
field:"status",
headerName:"Status",
flex:1,
renderCell:(p)=>(
<Chip
label={p.value}
color={
p.value==="Delivered"
?"success"
:p.value==="Preparing"
?"warning"
:"default"}
/>
)
},

{
field:"actions",
headerName:"Update",
flex:1.5,
renderCell:(params)=>(
<Select
size="small"
value={params.row.status}
onChange={async(e)=>{
await API.put(
`/orders/${params.row.mongoId}/status`,
{status:e.target.value}
);
fetchOrders();
}}
>
<MenuItem value="Pending">Pending</MenuItem>
<MenuItem value="Preparing">Preparing</MenuItem>
<MenuItem value="Out for Delivery">Out</MenuItem>
<MenuItem value="Delivered">Delivered</MenuItem>
</Select>
)
}
];

const reservationColumns = [
  { field: "id", headerName: "Res ID", flex: 1 },
  { field: "name", headerName: "Customer", flex: 1 },
  { field: "phone", headerName: "Phone", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", flex: 1 },
  { field: "people", headerName: "Guests", flex: 0.8 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1.2,
    renderCell: (params) => (
  <Button
    size="small"
    startIcon={<DeleteIcon />}
    color="error"
    variant="outlined"
    onClick={() => openDeleteDialog(params.row)}
  >
    Delete
  </Button>
)
  },
];

/* ===============================
   TABLE RENDER
================================ */

const renderTable=(title,rows,columns,loading)=>(
<StyledCard>
<CardContent>

<Typography variant="h5" fontWeight={700} mb={2}>
{title}
</Typography>

<Divider sx={{mb:2}}/>

<Box sx={{height:500}}>
<DataGrid
rows={rows}
columns={columns}
loading={loading}
slots={{toolbar:GridToolbar}}
pageSizeOptions={[5,10,20]}
initialState={{
pagination:{paginationModel:{pageSize:5,page:0}}
}}
disableRowSelectionOnClick
sx={tableStyle}
/>
</Box>

</CardContent>
</StyledCard>
);

/* ===============================
   PANEL SWITCH
================================ */

const renderPanel=()=>{
	switch(activePanel){
	case "users":
	return renderTable(
	"Users Management",
	users,
	userColumns,
	loadingUsers
	);

	case "orders":
	return renderTable(
	"Orders Management",
	orders,
	orderColumns,
	loadingOrders
	);

	case "reservations":
	return renderTable(
	"Reservations Management",
	reservations,
	reservationColumns,
	loadingReservations
	);

	default:
	return null;
	}
};

/* ===============================
   UI
================================ */

return(

<DashboardWrapper>

<Container maxWidth="lg">

<Typography
variant="h3"
align="center"
fontWeight={800}
mb={5}
color="#070000"
>
   Admin Dashboard
</Typography>

{/* ===============================
   STATS (CENTER ALIGNED)
================================ */}

<Grid
  container
  spacing={3}
  mb={5}
  justifyContent="center"   // ✅ centers cards horizontally
  alignItems="center"
>

{/* TOTAL USERS */}
<Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
  <StatCard
    sx={{
      background: "#9b0b0b",
      width: 160,
      height:100,
      maxWidth: 450,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1.5,
      py: 3
    }}
  >
    <PeopleIcon fontSize="large" />

    <Typography variant="h6">
      Total Users
    </Typography>

    <Typography variant="h4" fontWeight={700}>
      {users.length}
    </Typography>
  </StatCard>
</Grid>

{/* TOTAL ORDERS */}
<Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
  <StatCard
    sx={{
      background: "#ff6b35",
      width: 160,
      height:100,
      maxWidth: 450,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1.5,
      py: 3
    }}
  >
    <ReceiptIcon fontSize="large" />

    <Typography variant="h6">
      Total Orders
    </Typography>

    <Typography variant="h4" fontWeight={700}>
      {orders.length}
    </Typography>
  </StatCard>
</Grid>

{/* REVENUE */}
<Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
  <StatCard
    sx={{
      background: "#2ecc71",
      width: 160,
      height:100,
      maxWidth: 450,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1.5,
      py: 3
    }}
  >
    <PaymentsIcon fontSize="large" />

    <Typography variant="h6">
      Revenue
    </Typography>

    <Typography variant="h4" fontWeight={700}>
      ₹ {totalRevenue}
    </Typography>
  </StatCard>
</Grid>

{/* TOTAL RESERVATIONS */}
<Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
  <StatCard
    sx={{
      background: "#3498db",
      width: 160,
      height:100,
      maxWidth: 450,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1.5,
      py: 3
    }}
  >
    <EventIcon fontSize="large" />
    <Typography variant="h6">
      Reservations
    </Typography>
    <Typography variant="h4" fontWeight={700}>
      {totalReservations}
    </Typography>
  </StatCard>
</Grid>

</Grid>

<PanelTabs
activePanel={activePanel}
setActivePanel={setActivePanel}
tabs={tabs}
/>

{renderPanel()}

</Container>

<Dialog
  open={deleteDialogOpen}
  onClose={closeDeleteDialog}
  PaperProps={{
    sx: {
      borderRadius: 3,
      padding: 1,
    },
  }}
>
  <DialogTitle fontWeight={700} color="error">
    Delete Reservation
  </DialogTitle>

  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete reservation for{" "}
      <b>{selectedReservation?.name}</b> ?
      <br />
      This action cannot be undone.
    </DialogContentText>
  </DialogContent>

  <DialogActions>
    <Button onClick={closeDeleteDialog} variant="outlined">
      Cancel
    </Button>

    <Button
      onClick={confirmDeleteReservation}
      color="error"
      variant="contained"
      startIcon={<DeleteIcon />}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>

</DashboardWrapper>

);
};

export default AdminDashboard;