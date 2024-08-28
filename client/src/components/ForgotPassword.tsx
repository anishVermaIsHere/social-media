import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { useAppDispatch} from '../redux/store/store';
import userAPI from '../shared/services/api/auth';
import { handleSnackBar } from '../redux/slices/snackbar'; 


export const theme = createTheme({
    typography: {
        button: {
          textTransform: 'none'
        }
    },
});

export default function ForgotPassword() {
  const { register, handleSubmit, reset, formState:{ errors} }=useForm();
  const dispatch=useAppDispatch();
  
  const onSubmit= async(data:any) => {
    try {
        console.log('data', data);
    //   const res= await userAPI.register(data);
    //   if(res.status===201){
    //     dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: res.data.message }));
    //   }
    //   else {
    //     dispatch(handleSnackBar({ snackOpen: true, snackType: "warning", snackMessage: res.data.message }));
    //   } 
    } catch (error:any) {
      dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: error.message }));
    }
    reset();
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change password
          </Typography>
          <Box component="form" sx={{mt:3}} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  label="New Password"
                  {...register('password')}
                  type="password"
                  id="password"
                  autoComplete="off"
                  error={errors.password && Boolean(errors.password?.message)}
                  helperText={typeof errors.password?.message === 'string' ? errors.password.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  label="Repeat Password"
                  {...register('repeatPassword')}
                  type="password"
                  id="repeatPassword"
                  autoComplete="off"
                  error={errors.repeatPassword && Boolean(errors.repeatPassword?.message)}
                  helperText={typeof errors.repeatPassword?.message === 'string' ? errors.repeatPassword.message : ''} 
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p:1}}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

