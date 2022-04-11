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
import { User } from "../interfaces/user";
import getUserData from "../utils/getUserData";

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

interface Row {
  receiver: string,
  amount: number,
  date: string,
  key: number;
}


// rendered in the profile 
// simply a list of accrued debts 
const Debts = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [totalDebt, setTotalDebt] = useState<number>(0);
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

  const updateRows = () => {
    //console.log("rows updated");
    let temp_rows: Row[] = [];
    let debt: number = 0;

    // create a row for each of their debts
    for (let i = 0; i < userData.debts.length; i++) {
      temp_rows.push({
        key: i, amount: userData.debts[i].amount,
        date: userData.debts[i].date, receiver: userData.debts[i].receiver
      });
      // total their debt
      debt += userData.debts[i].amount;
    }

    setTotalDebt(debt);
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
  }, [userData]);

  return (
    <div>
      <TableContainer component={Paper} sx={{ width: 700 }} className={styles.container} >
        <Typography variant="h6">Outstanding Debts</Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left"><b>Receiver </b></StyledTableCell>
              <StyledTableCell align="left"><b>Amount ($)</b></StyledTableCell>
              <StyledTableCell align="left"><b>Date</b></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.receiver}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
              </StyledTableRow>
            ))}
            <Typography align="left" variant='subtitle1'>Total Debt: ${totalDebt}</Typography>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Debts;