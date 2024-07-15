import { Button, FormControl, TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

const CommentBox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log("comment posted", data);
  };

  return (
    <FormControl
      fullWidth
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <TextField
        fullWidth
        multiline
        maxRows={6}
        minRows={6}
        //   label="Comment..."
        autoComplete="off"
        sx={{ maxWidth: "100%" }}
        id="content"
        size="small"
        margin="dense"
        {...register("content")}
      />
      <Button
        variant="contained"
        type="submit"
        color="primary"
        fullWidth
        sx={{
          p: 1,
          marginRight: "0.8rem",
          minWidth: { xs: 100, md: 200 },
        }}
      >
        Comment
      </Button>
    </FormControl>
  );
};

export default CommentBox;
