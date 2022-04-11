import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { auto } from "@popperjs/core";
import { User } from "../interfaces/user";
import { useEffect, useState } from 'react';


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


function createData(position: number, name: string, score: number, games: number) {
  return { position, name, score, games };
}

interface Row {
  position: number,
  name: string,
  score: number,
  games: number;
}

const Leaderboard = () => {
  const [rows, setRows] = useState<Row[]>([]);

  const updateRows = (user_list: User[]) => {

    let temp_rows: Row[] = [];
    let names: string[][] = [];
    let scores: number[][] = [];
    let games_played: number[][] = [];

    for (var i = 0; i < user_list.length && i < 5; i++) {
      names.push([user_list[i].username, i.toString()]);
      scores.push([user_list[i].score, i]);
      games_played.push([user_list[i].gamesPlayed, i]);
    }

    scores.sort(function (a, b) {
      return a[0] - b[0];
    });

    for (i = scores.length - 1; i >= 0; i--) {
      var index: number = scores[i][1];
      var name: string = "";
      var played: number = 0;

      for (var j = 0; j < names.length; j++) {
        if (names[j][1] === index.toString()) {
          name = names[j][0];
          break;
        }
      }
      for (j = 0; j < games_played.length; j++) {
        if (games_played[j][1] === index) {
          played = games_played[j][0];
          break;
        }
      }

      temp_rows.push(createData(scores.length - i, name, scores[i][0], played));
    }
    setRows(temp_rows);
  }

  useEffect(() => {
    const getUsers = async () => {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/getUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const response = await request.json();

      let user_list: User[] = response.data;

      updateRows(user_list);

      if (response.success) {
        console.log("Players retrieved");
      } else {
        alert("Failed");
      }
    }
    getUsers();
  }, [])

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700, minHeight: 270 }} style={{ margin: auto }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="left"><b>Position</b></StyledTableCell>
            <StyledTableCell align="left"><b>Player</b></StyledTableCell>
            <StyledTableCell align="left"><b>Score</b></StyledTableCell>
            <StyledTableCell align="left"><b>Games Played</b></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.position}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.score}</TableCell>
              <TableCell align="left">{row.games}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Leaderboard;