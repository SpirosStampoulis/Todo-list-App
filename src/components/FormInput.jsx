import  React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import "./FormInput.scss";

const useStyles = makeStyles({
    label: {
        width: '80%'
    }
});


const TodoCreator = ({ todo, setTodo, clearInput, inputRef, isInputEmpty, preventSubmit }) => {
    const classes = useStyles();

    return (
        <div className="form__input">
                <FormControl   className={classes.label} noValidate autoComplete="off">
                    <TextField 
                        className="TextField"
                        id="outlined-basic"
                        label="What's need to be done?" // better accessibility with Material UI
                        value={todo}
                        variant="outlined"
                        onChange={(e) => setTodo(e.target.value)}
                        onFocus={clearInput}
                        ref={inputRef}
                        aria-describedby="component-error-text"
                        onKeyPress={preventSubmit}
                    />

                    { !isInputEmpty ?
                        <></>
                        :
                        <>
                            <FormHelperText id="component-error-text">Task can't be empty</FormHelperText>
                        </>
                    }
                </FormControl>
                <Button className="Button"
                    variant="contained" 
                    color="primary"
                    type="submit"
                    alt="add-note"
                    onKeyPress={preventSubmit}
                >
                    Add task
                </Button>
        </div>
    )

}

export  default TodoCreator;