import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import styles from "../styles/Debts.module.css";
import { Typography } from '@material-ui/core';
import getUserData from '../utils/getUserData';
import { User } from "../interfaces/user";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface GainsProps {
  username: string;
}

interface Row {
  from: string,
  amount: number,
  date: string,
  received: string,
  key: number;
}

// rendered in the profile 
// simply a list of accrued debts 
const Gains = ({ username }: GainsProps) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [totalGains, setTotalGains] = useState<number>(0);
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
    firsts: 0,
    seconds: 0,
    gamesPlayed: 0,
    score: 0,
    earnings: 0,
    debts: [],
    uuid: "",
    gains: [],
    senior: false,
    timestamp: new Date(),
    email: "",
  });

  const updateGain = async (key: number, amount: number, date: string, sender: string) => {
    const request = await fetch(`${process.env.REACT_APP_API_URL}/updateGain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        index: key,
        username,
        date,
        amount,
        sender,
      })
    });
    const response = await request.json();

    if (response.success) {
      console.log("Status updated");
    } else {
      alert("Failed to update");
    }
  }

  const handleUpdate = (key: number, amount: number, date: string, sender: string) => {
    updateGain(key, amount, date, sender);
  }

  const updateRows = () => {
    let temp_rows: Row[] = [];
    let gain: number = 0;

    // create a row for each of their debts
    let status: string;
    for (let i = 0; i < userData.gains.length; i++) {
      status = "False";
      if (userData.gains[i].received) {
        status = "True";
      }

      temp_rows.push({
        key: i, amount: userData.gains[i].amount,
        date: userData.gains[i].date, from: userData.gains[i].from,
        received: status
      });
      // total their debt
      gain += userData.gains[i].amount;
    }
    setTotalGains(gain);
    setRows(temp_rows);
  }

  const init = async () => {
    setUserData((await getUserData()) as User);
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    updateRows();
  }, [userData])

  return (
    <div>
      <TableContainer component={Paper} sx={{ width: 700 }} className={styles.container} >
        <Typography variant="h6">Outstanding Gains</Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left"><b>From </b></StyledTableCell>
              <StyledTableCell align="left"><b>Amount ($)</b></StyledTableCell>
              <StyledTableCell align="left"><b>Date</b></StyledTableCell>
              <StyledTableCell align="left"><b>Received</b></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>

            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.from}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.received}</TableCell>
                {(row.received === "False") ?
                  <TableCell align="left">
                    <button onClick={() => handleUpdate(row.key, row.amount, row.date, row.from)}>
                      Set to true
                    </button>
                  </TableCell>
                  : <TableCell></TableCell>
                }
              </StyledTableRow>
            ))}
            <Typography align="left" variant='subtitle1'>Total Winnings: ${totalGains}</Typography>
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  );
}

export default Gains;