import React, { useState } from 'react';
import { List, ListItem, ListSubheader, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: 'white',
    borderRadius: '9px',
    height: '70vh',
  },
  scrollable: {
    overflow: 'auto',
    maxHeight: '60vh'
  },
  subheader: {
    paddingBottom: '5px'
  }
}));


const ContactList = props => {
  const classes = useStyles();
  const selectedUser = props.selectedUser ? props.selectedUser : props.contacts[0]; 
  const [selected, setSelected] = useState(selectedUser);

  const handleClick = name => {
    setSelected(name);
    props.onClick(name);
  }

  return (
    <div className={classes.wrapper}>
      <List id="contactList">
      <ListSubheader className={classes.subheader}>Kontakter</ListSubheader>
      <div className={classes.scrollable}>
        {props.contacts && props.contacts.map((item, index) => (
          <ListItem button key={index} onClick={() => handleClick(item)} selected={selected === item || (!selected && index === 0) }>
            <ListItemText primary={item}/>
          </ListItem>
        ))}
      </div>
    </List>
    </div>
  )
}

export default ContactList;