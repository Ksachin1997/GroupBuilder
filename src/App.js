import React from 'react';
import { Box, Typography } from '@material-ui/core';
import './App.css';
import GroupCard from './GroupCard';
import UserCard from './UserCard';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import GroupIcon from '@material-ui/icons/Group';
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();

  const [people, setPeople] = React.useState([
    {
      "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/user14b9a23c.png",
      "name": "User1",
      "id": "1001"
    },
    {
      "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/user20c5688c.jpg",
      "name": "User2",
      "id": "1002"
    },
    {
      "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg",
      "name": "Richard Matthew",
      "id": "1003"
    },
    {
      "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard_Davies_Hansons_27b0aae3.jpeg",
      "name": "Richard Hansons",
      "id": "1004"
    },
    {
      "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/betty%20hansonb071ac8.jpg",
      "name": "Betty Hanson",
      "id": "1005"
    },
    {
      "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/doug%20hermann1a0ca42.jpg",
      "name": "Doug Hermann",
      "id": "1006"
    },
    {
      "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/martha%20hermann4ceeba1.jpg",
      "name": "Martha Hermann",
      "id": "1007"
    },
    {
      "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/dotty%20feliz841b64f.jpg",
      "name": "Dotty Feliz",
      "id": "1008"
    }
  ]);

  const [listItem, setListItem] = React.useState({
    name: "",
    id: "",
    editOption: false
  });

  const [list, setList] = React.useState([]);

  const handleChange = (event) => {
    setListItem({ name: event.target.value, id: list.length });
  };

  const handleClick = () => {
    if (listItem.name.trim().length === 0) {
      return;
    }
    let newList = [...list];
    newList.push(listItem);
    setList(newList);
  };

  const handleDelete = (key) => {
    let newList = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === key) {
        continue;
      }
      newList.push(list[i]);
    }

    setList(newList);
  };

  const handleEdit = (key) => {
    let newList = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === key && list[i].editOption === true) {
        return;
      }
      if (list[i].id === key) {
        let newListItem = {
          name: list[i].name,
          id: list[i].id,
          editOption: true
        };
        newList.push(newListItem);
        continue;
      }
      newList.push(list[i]);
    }

    setList(newList);
  };

  let edited = "";

  const handleSave = (key) => {
    if (edited.trim().length === 0) {
      return;
    }

    let newList = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === key) {
        let newListItem = {
          name: edited,
          id: list[i].id,
          editOption: false
        };
        newList.push(newListItem);
        continue;
      }
      newList.push(list[i]);
    }

    setList(newList);
  };

  const handleEditTask = (event) => {
    edited = event.target.value;
  };

  function sortByName(name){  
    return function(a,b){  
       if(a[name] > b[name])  
          return 1;  
       else if(a[name] < b[name])  
          return -1;  
   
       return 0;  
    }  
 }

 const handleSort = () => {
   people.sort(sortByName("name"));
 }

  React.useEffect(() => {
    axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json").then(res => {
      setPeople(res.data);
    }).catch(console.log("data not fetched"));
  },[]);

  return (
    <div className="App-header">
      <Box m={7}>
        <Typography>
          Create Group
        </Typography>
      </Box>
      <Box display="flex" m={3}>
        <Box m={4}>
          <GroupCard/>
        </Box>
        <Box display="flex" flexDirection="column" p={4}>

          <Box bgcolor="white" height="25%">

            <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            label="Group Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GroupIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            />

          </Box>
          <Box bgcolor="white" height="25%">

            <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            label="Group Description"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionSharpIcon />
                </InputAdornment>
              ),
            }}
            />

          </Box>

        </Box>
        <Box>
          <ul>
            {list.map((item) => (
              <li className="list" key={item.id}>
                {item.name}
                <button className="edit" onClick={() => handleEdit(item.id)}>
                  Edit
                </button>
                <button className="delete" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
                {item.editOption ? (
                  <div>
                    <textarea
                      className="editTask"
                      onChange={handleEditTask}
                    ></textarea>
                    <br />
                    <button
                      className="saveTask"
                      onClick={() => handleSave(item.id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </li>
            ))}
          </ul>
        </Box>
      </Box>

      <Box display="flex" maxWidth="80%">
        {people.map((p) => <UserCard key={p.id} image={p.Image} name={p.name}/>)}
      </Box>
      <Box m={2}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Update
        </Button>
        <Button variant="contained" color="secondary">
          Remove
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSort}>
          Sort
        </Button>
      </Box>
      
    </div>
  );
}

export default App;
