import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

interface Transaction {
  sender: string;
  amount: number;
  createdAt: string;
  status: string;
}

function createData(
  sender: string,
  amount: number,
  createdAt: string,
  status: string,
) {
  return { sender, amount, createdAt, status };
}

export default function BasicTable() {
  const [rows, setRows] = useState<Transaction[]>([]);
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>(`http://localhost:3333/transaction/${id}/transactions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const data = response.data;
        const transactionRows = data.map((transaction: Transaction) =>
          createData(
            transaction.sender,
            transaction.amount,
            transaction.createdAt,
            transaction.status
          )
        );
        setRows(transactionRows);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactions();
  }, [id, token]);

  const makeStyle = (status: string) => {
    if (status === "Successful") {
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    } else if (status === "Pending") {
      return {
        background: "#59bfff",
        color: "white",
      };
    } else {
      return {
        background: "#ffadad8f",
        color: "red",
      };
    }
  };
  
  return (
    <div className="Table">
      <h3>Recent Transactions</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rows.map((row) => (
              <TableRow
                key={row.sender}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.sender}
                </TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="left">{row.createdAt}</TableCell>
                <TableCell align="left">
                  <span
                    className="status"
                    style={makeStyle(row.status)}
                  >
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}



  