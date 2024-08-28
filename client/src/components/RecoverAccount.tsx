import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch} from '../redux/store/store';
import userAPI from '../shared/services/api/user';
import { handleSnackBar } from '../redux/slices/snackbar'; 
import { recoverEmailSchema } from '@/shared/validation/user';

type Schema = z.infer<typeof recoverEmailSchema>;

export default function RecoverAccount() {
  const { register, handleSubmit, reset, formState:{ errors} }=useForm({ resolver: zodResolver(recoverEmailSchema)});
  const dispatch=useAppDispatch();
  const [hiddenEmail, setHiddenEmail]=useState('');
  
  const onSubmit:SubmitHandler<Schema> = async(data:Schema) => {
    try {
        console.log('data', data);
      const res= await userAPI.recoverAccount(data.email);

      // if(res.status===200){
      //   dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: res.data.message }));
      // }
      // else {
      //   dispatch(handleSnackBar({ snackOpen: true, snackType: "warning", snackMessage: res.data.message }));
      // } 
    } catch (error:any) {
      dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: error.message }));
    }
    reset();
    setHiddenEmail(data.email);
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box mt={20}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', mx:'auto'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" mb={2}>
            Reset Account
          </Typography>
          <Typography component="h5">
            Please enter your email to send the secret code
          </Typography>
          {hiddenEmail && <Typography component='p' align='center'>Secret code has been sent on <strong>{hiddenEmail}</strong></Typography>}

          <Box component="form" sx={{ mt:3 }} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {!hiddenEmail ? 
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  label="Email"
                  {...register('email')}
                  type="email"
                  id="email"
                  autoComplete="off"
                  error={errors.email && Boolean(errors.email?.message)}
                  helperText={typeof errors.email?.message === 'string' ? errors.email.message : ''} 
                />
              </Grid>
              :
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  label="OTP"
                  {...register('otp')}
                  type="number"
                  id="otp"
                  autoComplete="off"
                  error={errors.otp && Boolean(errors.otp?.message)}
                  helperText={typeof errors.otp?.message === 'string' ? errors.otp.message : ''}
                />
              </Grid>}

              {/* <Grid item>
                <Link component={NavLink} to="#" variant="body2">Resend</Link>
              </Grid> */}
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p:1 }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

