import { useRef, ChangeEvent } from 'react';
import { useForm, Controller, SubmitHandler} from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { postSchema } from '../../../shared/validation/post';
import { Box, Button, FormControl, Input, Typography, TextField, Grid } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Item from '../../../components/Item';
import { handleSnackBar } from '../../../redux/slices/snackbar';
import { useAppDispatch } from '../../../redux/store/store';
import postAPI from '../../../shared/services/api/post';


const imagePreviewStyle={
    height:'150px',
    width:'150px',
    objectFit:'contain',
    marginBlock:'0.8rem'
}

type Schema=z.infer<typeof postSchema>

const Create = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {register,handleSubmit,formState:{errors},control, watch}=useForm<Schema>({resolver:zodResolver(postSchema)});
    const dispatch = useAppDispatch();
    const image = watch('image');
    const imagePreview = image ? URL.createObjectURL(image) : null;

    const onSubmit: SubmitHandler<Schema>=async(data: Schema)=>{
        try {
            const fd=new FormData();
            fd.append('image',data.image);
            fd.append('title',data.title);
            fd.append('content',data.content);
            fd.append('tags',data.tags);
            await postAPI.create(fd);
        } catch (error: any) {
            dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: error.message }));
        }
    }

    const handleClick=()=>{
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click event
        }
    }

    return (
        <Grid item xs={12} md={9}>
          <Item>
            <Grid container spacing={2}>
                <Grid item xs={12} md={9} sx={{margin:'auto'}}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Create Post
                  </Typography>
                  <Box sx={{ textAlign:'left' }}>
                        <FormControl fullWidth component="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <Box sx={{ display: 'flex',justifyContent:'center', flexDirection:'column', margin: '4px 0', alignItems: 'center',height:300, border:'4px dashed gray',borderRadius:'0.375rem' }}>
                            {imagePreview && <img src={imagePreview} alt="image-preview" style={imagePreviewStyle} />}
                            
                            <Button onClick={handleClick} sx={{ display:'flex', flexDirection:'column', background: 'none'}}>
                            <AddPhotoAlternateIcon fontSize="large"/>
                            <Typography component='p' mt={2}>Add photos/images</Typography>
                            </Button>
                            
                            <Controller
                                name="image"
                                control={control}
                                render={({ field: { ref, name, onBlur, onChange } }) => (
                                    <Input
                                        size="small"
                                        inputComponent="input"
                                        name={name}
                                        type="file"
                                        inputRef={fileInputRef}
                                        accept="image/*"
                                        onBlur={onBlur}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.files?.[0])}
                                        sx={{ display: "none"}}
                                    />
                                )}
                            />

                                {errors.image && <span className='error'>{errors.image.message}</span>}
                            </Box>

                            <TextField fullWidth
                                label="Title..."
                                autoComplete='off'
                                name="title"
                                sx={{ maxWidth: '100%' }}
                                id="title" size='small' margin='dense'
                                {...register('title')}
                                error={errors.title && Boolean(errors.title?.message)}
                                helperText={errors.title && errors.title?.message} />

                            <TextField fullWidth
                                multiline
                                maxRows={6}
                                minRows={6}
                                label="Post..."
                                autoComplete='off'
                                name="content"
                                sx={{ maxWidth: '100%' }}
                                id="content" size='small' margin='dense'
                                {...register('content')}
                                error={errors.content && Boolean(errors.content?.message)}
                                helperText={errors.content && errors.content?.message} />


                            <TextField fullWidth
                                label="Tags..."
                                autoComplete='off'
                                name="tags"
                                sx={{ maxWidth: '100%' }}
                                id="tags" size='small' margin='dense'
                                {...register('tags')}
                                error={errors.tags && Boolean(errors.tags?.message)}
                                helperText={errors.tags && errors.tags?.message} />


                            <Box mt={5} sx={{mx:'auto'}}>
                                <Button variant="contained" type="submit" color="primary" sx={{ p:1, marginRight: '0.8rem', minWidth:{xs:100,md:200}}}>
                                    Post
                                </Button>
                            </Box>
                        </FormControl>
                  </Box>
                </Grid>
            </Grid>
            </Item>
        </Grid>
    )
}

export default Create